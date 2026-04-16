import { ContentImage } from "@/components/shared/content-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Globe, Phone, Tag, Mail, Calendar, Clock } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { TaskImageCarousel } from "@/components/tasks/task-image-carousel";
import { cn } from "@/lib/utils";
import { ArticleComments } from "@/components/tasks/article-comments";
import { ArticleReadingProgress } from "@/components/tasks/article-reading-progress";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { getFactoryState } from "@/design/factory/get-factory-state";
import { getProductKind } from "@/design/factory/get-product-kind";
import { DirectoryTaskDetailPage } from "@/design/products/directory/task-detail-page";
import { TASK_DETAIL_PAGE_OVERRIDE_ENABLED, TaskDetailPageOverride } from "@/overrides/task-detail-page";

type PostContent = {
  category?: string;
  location?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  body?: string;
  excerpt?: string;
  author?: string;
  highlights?: string[];
  logo?: string;
  images?: string[];
  latitude?: number | string;
  longitude?: number | string;
};

const isValidImageUrl = (value?: string | null) =>
  typeof value === "string" && (value.startsWith("/") || /^https?:\/\//i.test(value));

const absoluteUrl = (value?: string | null) => {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (!value.startsWith("/")) return null;
  return `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${value}`;
};

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  return content as PostContent;
};

const formatArticleHtml = (content: PostContent, post: SitePost) => {
  const raw =
    (typeof content.body === "string" && content.body.trim()) ||
    (typeof content.description === "string" && content.description.trim()) ||
    (typeof post.summary === "string" && post.summary.trim()) ||
    "";

  return formatRichHtml(raw, "Details coming soon.");
};

const getImageUrls = (post: SitePost, content: PostContent) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaImages = media
    .map((item) => item?.url)
    .filter((url): url is string => isValidImageUrl(url));
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url))
    : [];
  const merged = [...mediaImages, ...contentImages];
  if (merged.length) return merged;
  if (isValidImageUrl(content.logo)) return [content.logo as string];
  return ["/placeholder.svg?height=900&width=1400"];
};

const toNumber = (value?: number | string) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const buildMapEmbedUrl = (
  latitude?: number | string,
  longitude?: number | string,
  address?: string
) => {
  const lat = toNumber(latitude);
  const lon = toNumber(longitude);
  const normalizedAddress = typeof address === "string" ? address.trim() : "";
  const googleMapsEmbedApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY?.trim();

  if (googleMapsEmbedApiKey) {
    const query = lat !== null && lon !== null ? `${lat},${lon}` : normalizedAddress;
    if (!query) return null;
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
      googleMapsEmbedApiKey
    )}&q=${encodeURIComponent(query)}`;
  }

  if (lat !== null && lon !== null) {
    const delta = 0.01;
    const left = lon - delta;
    const right = lon + delta;
    const bottom = lat - delta;
    const top = lat + delta;
    const bbox = `${left},${bottom},${right},${top}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
      bbox
    )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`;
  }

  if (normalizedAddress) {
    return `https://www.google.com/maps?q=${encodeURIComponent(normalizedAddress)}&output=embed`;
  }

  return null;
};

const stripHtmlForWordCount = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const estimateReadingMinutes = (html: string) => {
  const text = stripHtmlForWordCount(html);
  if (!text) return null;
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

export async function TaskDetailPage({ task, slug }: { task: TaskKey; slug: string }) {
  if (TASK_DETAIL_PAGE_OVERRIDE_ENABLED) {
    return await TaskDetailPageOverride({ task, slug });
  }

  const taskConfig = getTaskConfig(task);
  let post: SitePost | null = null;
  try {
    post = await fetchTaskPostBySlug(task, slug);
  } catch (error) {
    console.warn("Failed to load post detail", error);
  }

  if (!post) {
    notFound();
  }

  const content = getContent(post);
  const isClassified = task === "classified";
  const isArticle = task === "article";
  const category = content.category || post.tags?.[0] || taskConfig?.label || task;
  const description = content.description || post.summary || "Details coming soon.";
  const descriptionHtml = !isArticle ? formatRichHtml(description, "Details coming soon.") : "";
  const articleHtml = isArticle ? formatArticleHtml(content, post) : "";
  const articleSummary =
    post.summary ||
    (typeof content.excerpt === "string" ? content.excerpt : "") ||
    "";
  const articleAuthor =
    (typeof content.author === "string" && content.author.trim()) ||
    post.authorName ||
    "Editorial Team";
  const articleDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const postTags = Array.isArray(post.tags) ? post.tags.filter((tag) => typeof tag === "string") : [];
  const location = content.address || content.location;
  const images = getImageUrls(post, content);
  const mapEmbedUrl = buildMapEmbedUrl(content.latitude, content.longitude, location);
  const isBookmark = task === "sbm" || task === "social";
  const hideSidebar = isClassified || isArticle || task === "image" || isBookmark;
  const related = (await fetchTaskPosts(task, 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!content.category) return true;
      const itemContent = getContent(item);
      return itemContent.category === content.category;
    })
    .slice(0, 3);
  const articleUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/articles"}/${post.slug}`;
  const articleImage = absoluteUrl(images[0]) || absoluteUrl(SITE_CONFIG.defaultOgImage);
  const readingMinutes = isArticle ? estimateReadingMinutes(articleHtml) : null;
  const authorInitial = articleAuthor.trim().charAt(0).toUpperCase() || "E";
  const articlesIndexHref = taskConfig?.route || "/articles";
  const categoryBrowseHref = `${articlesIndexHref}?category=${encodeURIComponent(String(category))}`;

  const articleSchema = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: articleSummary || description,
        image: articleImage ? [articleImage] : [],
        author: {
          "@type": "Person",
          name: articleAuthor,
        },
        datePublished: post.publishedAt || undefined,
        dateModified: post.publishedAt || undefined,
        articleSection: category,
        keywords: postTags.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
      }
    : null;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.baseUrl.replace(/\/$/, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: taskConfig?.label || "Posts",
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${taskConfig?.route || "/posts"}/${post.slug}`,
      },
    ],
  };
  const schemaPayload = articleSchema ? [articleSchema, breadcrumbSchema] : breadcrumbSchema;
  const { recipe } = getFactoryState();
  const productKind = getProductKind(recipe);

  if (productKind === "directory" && (task === "listing" || task === "classified" || task === "profile")) {
    return (
      <div className="min-h-screen bg-[#f8fbff]">
        <NavbarShell />
        <DirectoryTaskDetailPage
          task={task}
          taskLabel={taskConfig?.label || task}
          taskRoute={taskConfig?.route || "/"}
          post={post}
          description={description}
          category={category}
          images={images}
          mapEmbedUrl={mapEmbedUrl}
          related={related}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen", isArticle ? "bg-slate-50" : "bg-background")}>
      {isArticle ? <ArticleReadingProgress /> : null}
      <NavbarShell />
      <main
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          isArticle ? "py-8 sm:py-12" : "py-10",
        )}
      >
        <SchemaJsonLd data={schemaPayload} />
        <Link
          href={articlesIndexHref}
          className={cn(
            "mb-6 inline-flex items-center text-sm font-medium transition-colors",
            isArticle ? "text-slate-600 hover:text-[#0047AB]" : "text-muted-foreground hover:text-foreground",
          )}
        >
          ← Back to {taskConfig?.label || "posts"}
        </Link>

        <div
          className={cn(
            "grid gap-10",
            hideSidebar ? "lg:grid-cols-1" : "lg:grid-cols-[2fr_1fr]"
          )}
        >
          <div className={cn(isClassified ? "space-y-8" : "")}>
            {isArticle ? (
              <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_40px_-12px_rgba(15,23,42,0.12)]">
                <div className="h-1.5 bg-gradient-to-r from-[#0047AB] via-[#0066d4] to-[#0047AB]" aria-hidden />
                <div className="px-5 pb-10 pt-8 sm:px-10 sm:pb-12 sm:pt-10">
                  <div className="flex flex-col gap-6 sm:gap-8">
                    <Link
                      href={categoryBrowseHref}
                      className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0047AB] hover:underline"
                    >
                      <Tag className="h-3.5 w-3.5 opacity-80" aria-hidden />
                      {category}
                    </Link>

                    <h1 className="!font-display text-[2rem] font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.08]">
                      {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-6">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 text-lg font-bold text-[#0047AB]"
                        aria-hidden
                      >
                        {authorInitial}
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="text-sm font-semibold text-slate-900">
                          <span className="text-slate-500">By </span>
                          {articleAuthor}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 sm:text-sm">
                          {articleDate ? (
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
                              {articleDate}
                            </span>
                          ) : null}
                          {articleDate && readingMinutes ? (
                            <span className="hidden text-slate-300 sm:inline" aria-hidden>
                              ·
                            </span>
                          ) : null}
                          {readingMinutes ? (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
                              {readingMinutes} min read
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    {postTags.length ? (
                      <div className="flex flex-wrap gap-2">
                        {postTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-slate-200 bg-slate-50/80 text-xs font-medium text-slate-700"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ) : null}

                    {articleSummary ? (
                      <p className="border-l-4 border-[#0047AB] pl-5 text-lg font-medium leading-relaxed text-slate-600 sm:text-xl sm:leading-relaxed">
                        {articleSummary}
                      </p>
                    ) : null}

                    {images[0] ? (
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200/80">
                        <ContentImage
                          src={images[0]}
                          alt={`${post.title} featured image`}
                          fill
                          className="object-cover"
                          priority
                          intrinsicWidth={1600}
                          intrinsicHeight={900}
                        />
                      </div>
                    ) : null}

                    <RichContent
                      html={articleHtml}
                      className="article-content prose-lg leading-8 prose-headings:scroll-mt-24 prose-p:my-5 prose-h2:my-8 prose-h3:my-6 prose-ul:my-5 prose-ol:my-5 prose-li:my-1.5 prose-a:text-[#0047AB]"
                    />

                    <div className="border-t border-slate-100 pt-8">
                      <h2 className="text-lg font-semibold tracking-tight text-slate-900">Comments</h2>
                      <p className="mt-1 text-sm text-slate-500">Share your perspective on this story.</p>
                      <div className="mt-6">
                        <ArticleComments slug={post.slug} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {!isArticle ? (
              <>
                {!isBookmark ? (
                  <div className={cn(isClassified ? "w-full" : "")}>
                    <TaskImageCarousel images={images} />
                  </div>
                ) : null}

                <div className={cn(isClassified ? "mx-auto w-full max-w-4xl" : "mt-6")}>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="inline-flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      {category}
                    </Badge>
                    {location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {location}
                      </span>
                    )}
                  </div>
                  <h1 className="mt-4 text-3xl font-semibold text-foreground">{post.title}</h1>
                  <RichContent html={descriptionHtml} className="mt-3 max-w-3xl" />
                </div>
              </>
            ) : null}

            {isClassified ? (
              <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">Business details</h2>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {content.website && (
                    <div className="flex items-start gap-2">
                      <Globe className="mt-0.5 h-4 w-4" />
                      <a
                        href={content.website}
                        className="break-all text-foreground hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content.website}
                      </a>
                    </div>
                  )}
                  {content.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4" />
                      <span>{content.phone}</span>
                    </div>
                  )}
                  {content.email && (
                    <div className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-4 w-4" />
                      <a
                        href={`mailto:${content.email}`}
                        className="break-all text-foreground hover:underline"
                      >
                        {content.email}
                      </a>
                    </div>
                  )}
                  {location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {content.highlights?.length && !isArticle ? (
              <div className={cn("mt-8 rounded-2xl border border-border bg-card p-6", isClassified ? "mx-auto w-full max-w-4xl" : "")}>
                <h2 className="text-lg font-semibold text-foreground">Highlights</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {content.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {isClassified && mapEmbedUrl ? (
              <div className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Location map</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <iframe
                    title="Business location map"
                    src={mapEmbedUrl}
                    className="h-56 w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

          </div>

          {!hideSidebar ? (
            <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Listing details</h2>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {content.website && (
                    <div className="flex items-start gap-2">
                      <Globe className="mt-0.5 h-4 w-4" />
                      <a
                        href={content.website}
                        className="break-all text-foreground hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content.website}
                      </a>
                    </div>
                  )}
                  {content.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4" />
                      <span>{content.phone}</span>
                    </div>
                  )}
                  {content.email && (
                    <div className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-4 w-4" />
                      <a
                        href={`mailto:${content.email}`}
                        className="break-all text-foreground hover:underline"
                      >
                        {content.email}
                      </a>
                    </div>
                  )}
                  {location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  )}
                </div>
              {content.website ? (
                <Button className="mt-5 w-full" asChild>
                  <a href={content.website} target="_blank" rel="noreferrer">
                    Visit Website
                  </a>
                </Button>
              ) : null}
            </div>

            {mapEmbedUrl ? (
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">Location map</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <iframe
                    title="Business location map"
                    src={mapEmbedUrl}
                    className="h-56 w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}

          </aside>
          ) : null}
        </div>

        <section
          className={cn(
            "mt-12",
            isArticle &&
              "mx-auto max-w-6xl rounded-xl border border-slate-200/90 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)] sm:p-8",
            !isArticle && related.length > 0 && "rounded-md border border-border bg-card p-6 sm:p-8",
          )}
        >
          {related.length ? (
            <>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0047AB]">
                    {isArticle ? "Next stories" : "Related"}
                  </p>
                  <h2
                    className={cn(
                      "mt-1 text-xl font-bold tracking-tight text-slate-900",
                      isArticle && "!font-display text-2xl font-semibold sm:text-[1.65rem]",
                    )}
                  >
                    More in {category}
                  </h2>
                </div>
                {taskConfig?.route ? (
                  <Link
                    href={isArticle ? categoryBrowseHref : taskConfig.route}
                    className="shrink-0 text-sm font-semibold text-[#0047AB] hover:underline"
                  >
                    View all
                  </Link>
                ) : null}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <TaskPostCard
                    key={item.id}
                    post={item}
                    href={buildPostUrl(task, item.slug)}
                    taskKey={task}
                  />
                ))}
              </div>
              {isArticle ? (
                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-6 text-sm text-slate-600">
                  {taskConfig?.route ? (
                    <Link href={taskConfig.route} className="font-semibold text-[#0047AB] hover:underline">
                      Browse all {taskConfig.label}
                    </Link>
                  ) : null}
                  <span className="hidden text-slate-300 sm:inline" aria-hidden>
                    ·
                  </span>
                  <Link
                    href={`/search?q=${encodeURIComponent(String(category))}`}
                    className="font-semibold text-[#0047AB] hover:underline"
                  >
                    Search in {category}
                  </Link>
                </div>
              ) : null}
            </>
          ) : null}
          <nav
            className={cn(
              "mt-6 rounded-md border border-slate-200 bg-slate-50/90 p-4",
              related.length > 0 && isArticle && "hidden",
            )}
          >
            <p className="text-sm font-semibold text-slate-900">Related links</p>
            <ul className="mt-2 space-y-2 text-sm">
              {related.map((item) => (
                <li key={`link-${item.id}`}>
                  <Link
                    href={buildPostUrl(task, item.slug)}
                    className="font-medium text-[#0047AB] underline-offset-4 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {taskConfig?.route ? (
                <li>
                  <Link
                    href={taskConfig.route}
                    className="font-medium text-[#0047AB] underline-offset-4 hover:underline"
                  >
                    Browse all {taskConfig.label}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  href={`/search?q=${encodeURIComponent(String(category))}`}
                  className="font-medium text-[#0047AB] underline-offset-4 hover:underline"
                >
                  Search more in {category}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}

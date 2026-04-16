import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'search-first',
    eyebrow: 'Article desk',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'article',
    featuredTaskKeys: ['article'],
  },
  navigation: {
    variant: 'compact',
  },
  footer: {
    variant: 'columns',
  },
  cards: {
    listing: 'listing-elevated',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'studio-panel',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})

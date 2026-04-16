"use client";

import { useEffect, useState } from "react";

export function ArticleReadingProgress() {
  const [widthPct, setWidthPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 0) {
        setWidthPct(100);
        return;
      }
      setWidthPct(Math.min(100, Math.max(0, (el.scrollTop / scrollable) * 100)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="reading-progress"
      style={{ width: `${widthPct}%` }}
      aria-hidden
      role="presentation"
    />
  );
}

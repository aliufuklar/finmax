import type { Metadata } from "next";
import { routing, type AppLocale } from "@/i18n/routing";
import { site } from "@/lib/site";

export function getLocalePath(locale: AppLocale, path: string) {
  const normalized = path === "/" ? "" : path;
  return `/${locale}${normalized}`;
}

export function buildAlternates(locale: AppLocale, path: string) {
  const canonical = getLocalePath(locale, path);
  const languages: Record<string, string> = {};

  for (const l of routing.locales) {
    languages[l] = getLocalePath(l, path);
  }

  return { canonical, languages };
}

export function buildPageMetadata(params: {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const alternates = buildAlternates(params.locale, params.path);
  const url = `${site.url}${alternates.canonical}`;

  return {
    title: params.title,
    description: params.description,
    alternates,
    openGraph: {
      title: params.title,
      description: params.description,
      url,
      siteName: site.name,
      type: "website",
      images: [
        {
          url: "/media/hero-factory.jpg",
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
      images: ["/media/hero-factory.jpg"],
    },
  };
}

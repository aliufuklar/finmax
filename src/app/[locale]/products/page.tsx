import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { products } from "@/lib/products";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  const t = await getTranslations({ locale: resolved, namespace: "products" });

  return buildPageMetadata({
    locale: resolved,
    path: "/products",
    title: t("index.title"),
    description: t("index.subtitle"),
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {t("index.title")}
      </h1>
      <p className="mt-4 max-w-3xl text-zinc-300">{t("index.subtitle")}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={p.image}
                alt={t(`items.${p.slug}.name`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            </div>
            <div className="p-5">
              <div className="text-sm font-semibold text-zinc-100">
                {t(`items.${p.slug}.name`)}
              </div>
              <div className="mt-2 text-sm leading-6 text-zinc-300">
                {t(`items.${p.slug}.tagline`)}
              </div>
              <div className="mt-4 text-xs font-semibold text-[color:var(--metal)]">
                View →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

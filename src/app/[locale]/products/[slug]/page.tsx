import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { products, getProductBySlug } from "@/lib/products";
import { site } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolved = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  if (!getProductBySlug(slug)) {
    return buildPageMetadata({
      locale: resolved,
      path: "/products",
      title: "Products",
      description: "Product catalog",
    });
  }

  const t = await getTranslations({ locale: resolved, namespace: "products" });

  return buildPageMetadata({
    locale: resolved,
    path: `/products/${slug}`,
    title: t(`items.${slug}.name`),
    description: t(`items.${slug}.tagline`),
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: "products" });
  const common = await getTranslations({ locale, namespace: "common" });

  const summary = t.raw(`data.${slug}.technicalSummary`) as unknown;
  const tests = t.raw(`data.${slug}.qualityTests`) as unknown;
  const options = t.raw(`data.${slug}.options`) as unknown;

  const summaryItems = Array.isArray(summary) ? (summary as string[]) : [];
  const testItems = Array.isArray(tests) ? (tests as string[]) : [];
  const optionItems = Array.isArray(options) ? (options as string[]) : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
            Manufacturer-to-Manufacturer
            <span className="h-1 w-1 rounded-full bg-[color:var(--metal)]" />
            Quotation-ready
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            {t(`items.${slug}.name`)}
          </h1>
          <p className="mt-4 max-w-xl text-zinc-300">
            {t(`items.${slug}.tagline`)}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="h-11 rounded-lg bg-white px-5 text-sm font-semibold text-black flex items-center justify-center"
            >
              {common("getQuote")}
            </a>
            <a
              href={`/${locale}/contact`}
              className="h-11 rounded-lg border border-white/15 bg-white/5 px-5 text-sm font-semibold text-zinc-50 flex items-center justify-center"
            >
              {t("detail.fastQuote")}
            </a>
          </div>
        </div>

        <div className="group overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <div className="relative aspect-[16/11]">
            <Image
              src={product.image}
              alt={t(`items.${slug}.name`)}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">{t("detail.technicalSummary")}</h2>
          <ul className="mt-5 space-y-3">
            {summaryItems.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-zinc-100">
            {t("detail.fastQuote")}
          </div>
          <div className="mt-2 text-sm text-zinc-300">
            {t("detail.fastQuoteText")}
          </div>
          <div className="mt-5 grid gap-3">
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="h-11 rounded-lg bg-white text-sm font-semibold text-black flex items-center justify-center"
            >
              {common("whatsapp")}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="h-11 rounded-lg border border-white/15 bg-white/5 text-sm font-semibold text-zinc-50 flex items-center justify-center"
            >
              {common("email")}
            </a>
            <a
              href={`tel:${site.phones[0]}`}
              className="h-11 rounded-lg border border-white/15 bg-white/5 text-sm font-semibold text-zinc-50 flex items-center justify-center"
            >
              {common("phone")}
            </a>
          </div>
        </aside>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">{t("detail.qualityTests")}</h2>
          <ul className="mt-5 space-y-3">
            {testItems.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">{t("detail.options")}</h2>
          <ul className="mt-5 space-y-3">
            {optionItems.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">{t("detail.documents")}</h2>
        <p className="mt-3 text-sm text-zinc-300">{t("detail.docsPlaceholder")}</p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200">
          {common("comingSoon")}
        </div>
      </section>
    </div>
  );
}

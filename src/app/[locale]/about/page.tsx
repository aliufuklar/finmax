import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { routing, type AppLocale } from "@/i18n/routing";
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

  const t = await getTranslations({ locale: resolved, namespace: "about" });

  return buildPageMetadata({
    locale: resolved,
    path: "/about",
    title: t("title"),
    description: t("text"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-sm leading-7 text-zinc-300">{t("text")}</p>

          <h2 className="mt-10 text-lg font-semibold">{t("servicesTitle")}</h2>
          <ul className="mt-5 space-y-3">
            {[
              t("services.tanks"),
              t("services.metal"),
              t("services.accessories"),
              t("services.equipment")
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="relative aspect-[16/11]">
            <Image
              src="/media/hero-factory.jpg"
              alt="Finmax manufacturing"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

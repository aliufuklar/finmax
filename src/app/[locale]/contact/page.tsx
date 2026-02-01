import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import { routing, type AppLocale } from "@/i18n/routing";
import { site } from "@/lib/site";
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

  const t = await getTranslations({ locale: resolved, namespace: "contact" });

  return buildPageMetadata({
    locale: resolved,
    path: "/contact",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });
  const common = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-zinc-300">{t("subtitle")}</p>

          <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div>
              <div className="text-xs font-semibold tracking-wide text-zinc-200">
                {common("phone")}
              </div>
              <div className="mt-2 space-y-1 text-sm text-zinc-300">
                <a className="block hover:text-white" href={`tel:${site.phones[0]}`}>
                  {site.phones[0]}
                </a>
                <a className="block hover:text-white" href={`tel:${site.phones[1]}`}>
                  {site.phones[1]}
                </a>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wide text-zinc-200">
                {common("email")}
              </div>
              <a
                className="mt-2 block text-sm text-zinc-300 hover:text-white"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wide text-zinc-200">
                {common("address")}
              </div>
              <div className="mt-2 text-sm text-zinc-300">{site.address}</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

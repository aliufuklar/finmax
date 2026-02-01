import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
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

  const meta = await getTranslations({ locale: resolved, namespace: "meta" });

  return buildPageMetadata({
    locale: resolved,
    path: "/",
    title: meta("defaultTitle"),
    description: meta("defaultDescription"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const c = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="bg-grid">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/hero-factory.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-70"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-[#070a0f]" />
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-55"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-factory.jpg"
          >
            <source src="/media/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-20 md:pb-24 md:pt-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
              {t("hero.badge1")}
              <span className="h-1 w-1 rounded-full bg-[color:var(--metal)]" />
              {t("hero.badge2")}
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200 md:text-lg md:leading-8">
              {t("hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${site.whatsapp.replace(/\\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="h-11 rounded-lg bg-white px-5 text-sm font-semibold text-black flex items-center justify-center"
              >
                {t("hero.ctaPrimary")}
              </a>
              <a
                href={`/${locale}/products`}
                className="h-11 rounded-lg border border-white/15 bg-white/5 px-5 text-sm font-semibold text-zinc-50 flex items-center justify-center"
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            {t("trust.title")}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: t("trust.cards.volume.title"),
              text: t("trust.cards.volume.text"),
            },
            {
              title: t("trust.cards.repeatability.title"),
              text: t("trust.cards.repeatability.text"),
            },
            {
              title: t("trust.cards.export.title"),
              text: t("trust.cards.export.text"),
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6 motion-safe:animate-fade-up"
            >
              <div className="text-sm font-semibold text-zinc-100">
                {card.title}
              </div>
              <div className="mt-2 text-sm leading-6 text-zinc-300">
                {card.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="production"
        className="mx-auto max-w-6xl px-6 py-16 md:py-20 scroll-mt-24"
      >
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          {t("production.title")}
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            {
              img: "/media/process-wavewall.jpg",
              alt: "Dalga duvar üretim hattı",
              kicker: t("production.cards.wavewall.kicker"),
              benefit: t("production.cards.wavewall.benefit"),
            },
            {
              img: "/media/process-welding.jpg",
              alt: "Kaynak / robotik işlem",
              kicker: t("production.cards.welding.kicker"),
              benefit: t("production.cards.welding.benefit"),
            },
            {
              img: "/media/process-vacuum.jpg",
              alt: "Vakumlu kurutma / yağ odası",
              kicker: t("production.cards.vacuum.kicker"),
              benefit: t("production.cards.vacuum.benefit"),
            },
            {
              img: "/media/process-shipment.jpg",
              alt: "Sevkiyata hazır kazanlar",
              kicker: t("production.cards.shipment.kicker"),
              benefit: t("production.cards.shipment.benefit"),
            },
          ].map((item) => (
            <div
              key={item.kicker}
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-sm font-semibold text-zinc-100">
                  {item.kicker}
                </div>
                <div className="mt-2 text-sm leading-6 text-zinc-300">
                  {item.benefit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="capacity"
        className="mx-auto max-w-6xl px-6 py-16 md:py-20 scroll-mt-24"
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {t("capacity.title")}
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-200">
              <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                {t("capacity.items.tank")}
              </li>
              <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                {t("capacity.items.wavewall")}
              </li>
              <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                {t("capacity.items.accessories")}
              </li>
            </ul>
            <p className="mt-4 text-sm text-zinc-400">{t("capacity.note")}</p>
          </div>

          <div className="relative order-1 overflow-hidden rounded-xl border border-white/10 bg-white/5 md:order-2">
            <div className="relative aspect-[16/11]">
              <Image
                src="/media/capacity-production.jpg"
                alt="Üretim kapasitesi"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="quality"
        className="mx-auto max-w-6xl px-6 py-16 md:py-20 scroll-mt-24"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            {t("quality.title")}
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              t("quality.items.leak"),
              t("quality.items.pt"),
              t("quality.items.pressure"),
              t("quality.items.weld"),
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="export"
        className="mx-auto max-w-6xl px-6 py-16 md:py-20 scroll-mt-24"
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <div className="relative aspect-[16/11]">
              <Image
                src="/media/logistics-export.jpg"
                alt="İhracat ve lojistik"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {t("export.title")}
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-200">
              <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                {t("export.items.location")}
              </li>
              <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                {t("export.items.packaging")}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-6 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-semibold tracking-tight md:text-xl">
                {t("ctaBand.title")}
              </div>
              <div className="mt-2 text-sm text-zinc-200">
                {t("ctaBand.subtitle")}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${site.whatsapp.replace(/\\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="h-11 rounded-lg bg-white px-5 text-sm font-semibold text-black flex items-center justify-center"
              >
                {c("whatsapp")}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="h-11 rounded-lg border border-white/15 bg-white/5 px-5 text-sm font-semibold text-zinc-50 flex items-center justify-center"
              >
                {c("email")}
              </a>
              <a
                href={`tel:${site.phones[0]}`}
                className="h-11 rounded-lg border border-white/15 bg-white/5 px-5 text-sm font-semibold text-zinc-50 flex items-center justify-center"
              >
                {c("phone")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

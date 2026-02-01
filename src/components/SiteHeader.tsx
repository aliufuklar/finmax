"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { site } from "@/lib/site";

const storageKey = "finmax_locale";

function setLocalePreference(locale: string) {
  try {
    localStorage.setItem(storageKey, locale);
  } catch {}
  document.cookie = `NEXT_LOCALE=${encodeURIComponent(locale)}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

function LocaleDropdown({
  locale,
  languages,
  onSelectLocale,
  align = "end",
}: {
  locale: string;
  languages: { locale: string; label: string }[];
  onSelectLocale: (nextLocale: string) => void;
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const container = target.closest("[data-locale-dropdown]");
      if (!container) setOpen(false);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const menuId = `locale-menu-${id}`;
  const triggerId = `locale-trigger-${id}`;

  return (
    <div className="relative" data-locale-dropdown>
      <button
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="h-9 rounded-md border border-white/10 bg-white/5 px-2 text-xs font-semibold tracking-wide text-zinc-100 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/20"
      >
        {locale.toUpperCase()}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={triggerId}
          className={`absolute top-full mt-2 min-w-[10rem] overflow-hidden rounded-xl bg-zinc-950/95 backdrop-blur-md border border-white/10 shadow-lg ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          {languages.map((l) => {
            const selected = l.locale === locale;
            return (
              <button
                key={l.locale}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  if (l.locale !== locale) onSelectLocale(l.locale);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/20 ${
                  selected
                    ? "bg-white/15 text-white"
                    : "text-zinc-200 hover:bg-white/10"
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      html.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  const languages = useMemo(
    () =>
      routing.locales.map((l) => ({
        locale: l,
        label: l.toUpperCase(),
      })),
    []
  );

  function onSelectLocale(nextLocale: string) {
    setLocalePreference(nextLocale);
    router.replace(pathname, { locale: nextLocale as AppLocale });
  }

  const isRtl = locale === "ar";
  const homeHref = `/${locale}`;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href={homeHref}
            className="text-sm font-semibold tracking-wide text-zinc-100"
          >
            FINMAX TRAFO
          </a>

          <nav className="hidden items-center gap-6 text-sm text-zinc-200 md:flex">
            <a
              href={`${homeHref}#production`}
              className="hover:text-white transition-colors"
            >
              {t("production")}
            </a>
            <a
              href={`${homeHref}#capacity`}
              className="hover:text-white transition-colors"
            >
              {t("capacity")}
            </a>
            <a
              href={`${homeHref}/products`}
              className="hover:text-white transition-colors"
            >
              {t("products")}
            </a>
            <a
              href={`${homeHref}#quality`}
              className="hover:text-white transition-colors"
            >
              {t("quality")}
            </a>
            <a
              href={`${homeHref}#export`}
              className="hover:text-white transition-colors"
            >
              {t("export")}
            </a>
            <a
              href={`${homeHref}/about`}
              className="hover:text-white transition-colors"
            >
              {t("about")}
            </a>
            <a
              href={`${homeHref}/contact`}
              className="hover:text-white transition-colors"
            >
              {t("contact")}
            </a>
          </nav>

          <div
            className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
          >
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden h-9 w-9 rounded-md border border-white/15 bg-white/5 text-zinc-100"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path
                  d="M5 7h14M5 12h14M5 17h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <LocaleDropdown
              locale={locale}
              languages={languages}
              onSelectLocale={onSelectLocale}
            />

            <a
              href={`${homeHref}/contact`}
              className="hidden h-9 items-center rounded-md bg-white px-3 text-xs font-semibold text-black md:flex"
            >
              {t("ctaContact")}
            </a>

            <a
              href={`https://wa.me/${site.whatsapp.replace(/\\D/g, "")}`}
              className="md:hidden h-9 rounded-md border border-white/15 bg-white/5 px-3 text-xs font-semibold text-zinc-100 flex items-center"
            >
              {t("ctaContact")}
            </a>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm motion-safe:animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-6 pt-6 pb-10">
            <div className="flex items-center justify-between">
              <a
                href={homeHref}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold tracking-wide text-zinc-100"
              >
                FINMAX TRAFO
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="h-10 w-10 rounded-md border border-white/15 bg-white/5 text-zinc-100"
                aria-label="Close"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold tracking-wide text-zinc-200">
                  {t("products")}
                </div>
              <LocaleDropdown
                locale={locale}
                languages={languages}
                onSelectLocale={onSelectLocale}
                align="end"
              />
              </div>
            </div>

            <nav className="mt-6 flex flex-col gap-2 text-base">
              {[
                { href: `${homeHref}#production`, label: t("production") },
                { href: `${homeHref}#capacity`, label: t("capacity") },
                { href: `${homeHref}/products`, label: t("products") },
                { href: `${homeHref}#quality`, label: t("quality") },
                { href: `${homeHref}#export`, label: t("export") },
                { href: `${homeHref}/about`, label: t("about") },
                { href: `${homeHref}/contact`, label: t("contact") }
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-zinc-100 transition-colors hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto grid gap-3 pt-10">
              <a
                href={`${homeHref}/contact`}
                onClick={() => setMobileOpen(false)}
                className="h-11 w-full rounded-lg bg-white text-sm font-semibold text-black flex items-center justify-center"
              >
                {t("ctaContact")}
              </a>
              <a
                href={`https://wa.me/${site.whatsapp.replace(/\\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="h-11 w-full rounded-lg border border-white/15 bg-white/5 text-sm font-semibold text-zinc-100 flex items-center justify-center"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

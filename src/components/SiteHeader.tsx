"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
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

type ProductsMenuGroup = {
  title: string;
  items: { href: string; label: string }[];
};

function ProductsDropdown({
  locale,
  label,
  groups,
  viewAllLabel,
  viewAllHref,
  align = "start",
}: {
  locale: AppLocale;
  label: string;
  groups: ProductsMenuGroup[];
  viewAllLabel: string;
  viewAllHref: string;
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLAnchorElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const container = target.closest("[data-products-dropdown]");
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

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const menuId = `products-menu-${id}`;
  const triggerId = `products-trigger-${id}`;

  return (
    <div
      ref={wrapperRef}
      className="relative"
      data-products-dropdown
      onMouseEnter={() => {
        if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = window.setTimeout(() => setOpen(false), 120);
      }}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as HTMLElement | null;
        if (!next) return;
        const wrapper = wrapperRef.current;
        if (wrapper && !wrapper.contains(next)) setOpen(false);
      }}
    >
      <button
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-expanded={open}
        onClick={() => {
          if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
          closeTimerRef.current = null;
          setOpen(true);
        }}
        onFocus={() => {
          if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
          closeTimerRef.current = null;
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            queueMicrotask(() => firstItemRef.current?.focus());
          }
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className="rounded-md outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/20"
      >
        {label}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={triggerId}
          className={`absolute top-full mt-3 w-[34rem] overflow-hidden rounded-2xl bg-zinc-950/95 backdrop-blur-md border border-white/10 shadow-2xl motion-safe:animate-dropdown ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          <div className="grid grid-cols-2 gap-6 p-5">
            {groups.map((group, groupIndex) => (
              <div key={group.title}>
                <div className="text-xs font-semibold tracking-wide text-zinc-200">
                  {group.title}
                </div>
                <div className="mt-3 grid gap-2">
                  {group.items.map((item, itemIndex) => (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      locale={locale}
                      role="menuitem"
                      ref={
                        groupIndex === 0 && itemIndex === 0 ? firstItemRef : undefined
                      }
                      className="rounded-lg px-2 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/20 outline-none"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-4">
            <Link
              href={viewAllHref}
              locale={locale}
              className="flex h-10 items-center justify-center rounded-lg bg-white text-sm font-semibold text-black"
              onClick={() => setOpen(false)}
            >
              {viewAllLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteHeader() {
  const t = useTranslations("nav");
  const c = useTranslations("common");
  const pm = useTranslations("productsMenu");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

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
  const desktopLinks = [
    { key: "capacity", href: `${homeHref}#capacity`, label: t("capacity") },
    { key: "quality", href: `${homeHref}#quality`, label: t("quality") },
    { key: "export", href: `${homeHref}#export`, label: t("export") },
    { key: "about", href: `${homeHref}/about`, label: t("about") },
  ];

  const productMenuGroups: ProductsMenuGroup[] = [
    {
      title: pm("tanks.title"),
      items: [
        { href: "/products/transformer-tank", label: pm("tanks.items.wave") },
        { href: "/products/transformer-tank", label: pm("tanks.items.flat") },
      ],
    },
    {
      title: pm("waveWall.title"),
      items: [{ href: "/products/wavewall", label: pm("waveWall.items.production") }],
    },
    {
      title: pm("accessories.title"),
      items: [
        { href: "/products/accessories", label: pm("accessories.items.general") },
      ],
    },
    {
      title: pm("process.title"),
      items: [
        { href: "/products/coil-winding-machine", label: pm("process.items.coil") },
        {
          href: "/products/vacuum-drying-oven",
          label: pm("process.items.vacuumDrying"),
        },
        {
          href: "/products/vacuum-oil-filling-room",
          label: pm("process.items.vacuumOilFilling"),
        },
        {
          href: "/products/oil-purification",
          label: pm("process.items.oilPurification"),
        },
      ],
    },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            locale={locale as AppLocale}
            className="flex items-center"
            aria-label="Finmax Trafo & Metal"
          >
            <img
              src="/media/finmax-logo.svg"
              alt="Finmax Trafo & Metal"
              className="block h-6 w-auto md:h-8"
              draggable={false}
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-zinc-200 md:flex">
            <a
              href={desktopLinks[0].href}
              className="hover:text-white transition-colors"
            >
              {desktopLinks[0].label}
            </a>
            <ProductsDropdown
              locale={locale as AppLocale}
              label={t("products")}
              groups={productMenuGroups}
              viewAllLabel={pm("viewAll")}
              viewAllHref="/products"
              align={isRtl ? "end" : "start"}
            />
            {desktopLinks.slice(1).map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
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

            <Link
              href="/contact"
              locale={locale as AppLocale}
              className="hidden h-9 items-center rounded-md bg-white px-3 text-xs font-semibold text-black md:flex"
            >
              {t("ctaContact")}
            </Link>

            <a
              href={`https://wa.me/${site.whatsapp.replace(/\\D/g, "")}`}
              className="md:hidden h-9 rounded-md border border-white/15 bg-white/5 px-3 text-xs font-semibold text-zinc-100 flex items-center"
            >
              WhatsApp
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
              <Link
                href="/"
                locale={locale as AppLocale}
                onClick={() => setMobileOpen(false)}
                className="flex items-center"
                aria-label="Finmax Trafo & Metal"
              >
                <img
                  src="/media/finmax-logo.svg"
                  alt="Finmax Trafo & Metal"
                  className="block h-6 w-auto"
                  draggable={false}
                />
              </Link>
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
                  {c("language")}
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
                { href: `${homeHref}#capacity`, label: t("capacity") },
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

              <button
                type="button"
                onClick={() => setMobileProductsOpen((v) => !v)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-zinc-100 transition-colors hover:bg-white/10 flex items-center justify-between"
                aria-expanded={mobileProductsOpen}
              >
                <span>{t("products")}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {mobileProductsOpen && (
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="grid gap-6">
                    {productMenuGroups.map((group) => (
                      <div key={group.title}>
                        <div className="text-xs font-semibold tracking-wide text-zinc-200">
                          {group.title}
                        </div>
                        <div className="mt-3 grid gap-2">
                          {group.items.map((item) => (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              locale={locale as AppLocale}
                              onClick={() => {
                                setMobileProductsOpen(false);
                                setMobileOpen(false);
                              }}
                              className="rounded-lg px-2 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Link
                      href="/products"
                      locale={locale as AppLocale}
                      onClick={() => {
                        setMobileProductsOpen(false);
                        setMobileOpen(false);
                      }}
                      className="flex h-10 items-center justify-center rounded-lg bg-white text-sm font-semibold text-black"
                    >
                      {pm("viewAll")}
                    </Link>
                  </div>
                </div>
              )}

              {[
                { href: `${homeHref}#quality`, label: t("quality") },
                { href: `${homeHref}#export`, label: t("export") },
                { href: `${homeHref}/about`, label: t("about") },
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
              <Link
                href="/contact"
                locale={locale as AppLocale}
                onClick={() => setMobileOpen(false)}
                className="h-11 w-full rounded-lg bg-white text-sm font-semibold text-black flex items-center justify-center"
              >
                {t("ctaContact")}
              </Link>
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

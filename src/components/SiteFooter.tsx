"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/lib/site";

export default function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold tracking-wide">
              FINMAX TRAFO
            </div>
            <p className="mt-3 text-sm text-zinc-300">
              {site.address}
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">{t("quickLinks")}</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>
                <a className="hover:text-white" href={`/${locale}#production`}>
                  {nav("production")}
                </a>
              </li>
              <li>
                <a className="hover:text-white" href={`/${locale}/products`}>
                  {nav("products")}
                </a>
              </li>
              <li>
                <a className="hover:text-white" href={`/${locale}/about`}>
                  {nav("about")}
                </a>
              </li>
              <li>
                <a className="hover:text-white" href={`/${locale}/contact`}>
                  {nav("contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">{t("contact")}</div>
            <div className="mt-3 space-y-2 text-sm text-zinc-300">
              <a className="block hover:text-white" href={`tel:${site.phones[0]}`}>
                {site.phones[0]}
              </a>
              <a className="block hover:text-white" href={`tel:${site.phones[1]}`}>
                {site.phones[1]}
              </a>
              <a className="block hover:text-white" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">
          <div>
            © {year ?? ""} {site.name}. {t("rights")}
          </div>
          <div className="flex items-center gap-3">
            <a
              className="hover:text-white"
              href={`https://wa.me/${site.whatsapp.replace(/\\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a className="hover:text-white" href="#" aria-disabled="true">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

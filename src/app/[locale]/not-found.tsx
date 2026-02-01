import { headers } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";

export default async function NotFoundPage() {
  const headerList = await headers();
  const headerLocale = headerList.get("x-locale");
  const resolvedLocale: AppLocale = routing.locales.includes(headerLocale as AppLocale)
    ? (headerLocale as AppLocale)
    : routing.defaultLocale;
  setRequestLocale(resolvedLocale);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">404</h1>
      <p className="mt-3 text-zinc-300">Sayfa bulunamadı.</p>
    </div>
  );
}

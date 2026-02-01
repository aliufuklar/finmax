import { setRequestLocale } from "next-intl/server";

export default async function NotFoundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">404</h1>
      <p className="mt-3 text-zinc-300">Sayfa bulunamadı.</p>
    </div>
  );
}

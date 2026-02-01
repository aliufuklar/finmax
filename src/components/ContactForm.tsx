"use client";

import { FormEvent, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

type FormState = {
  name: string;
  company: string;
  country: string;
  productType: string;
  message: string;
};

export default function ContactForm() {
  const t = useTranslations("contact");
  const common = useTranslations("common");

  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    country: "",
    productType: "",
    message: "",
  });

  const mailtoHref = useMemo(() => {
    const subject = `Finmax - ${form.productType || "Inquiry"}`;
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Country: ${form.country}`,
      `Product: ${form.productType}`,
      "",
      form.message,
    ].join("\n");

    const url = new URL(`mailto:${site.email}`);
    url.searchParams.set("subject", subject);
    url.searchParams.set("body", body);
    return url.toString();
  }, [form]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    window.location.href = mailtoHref;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          required
          placeholder={t("form.name")}
          className="h-11 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-white/25"
        />
        <input
          value={form.company}
          onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
          required
          placeholder={t("form.company")}
          className="h-11 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-white/25"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={form.country}
          onChange={(e) => setForm((s) => ({ ...s, country: e.target.value }))}
          placeholder={t("form.country")}
          className="h-11 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-white/25"
        />
        <input
          value={form.productType}
          onChange={(e) =>
            setForm((s) => ({ ...s, productType: e.target.value }))
          }
          placeholder={t("form.productType")}
          className="h-11 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-white/25"
        />
      </div>

      <textarea
        value={form.message}
        onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
        required
        placeholder={t("form.message")}
        rows={6}
        className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-white/25"
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="h-11 rounded-lg bg-white px-5 text-sm font-semibold text-black flex items-center justify-center"
        >
          {t("form.send")}
        </button>
        <a
          href={`https://wa.me/${site.whatsapp.replace(/\\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="h-11 rounded-lg border border-white/15 bg-white/5 px-5 text-sm font-semibold text-zinc-50 flex items-center justify-center"
        >
          {common("whatsapp")}
        </a>
      </div>
    </form>
  );
}

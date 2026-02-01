import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
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

  return buildPageMetadata({
    locale: resolved,
    path: "/about",
    title: "About Finmax | Transformer Tank Manufacturing Partner",
    description:
      "Learn about Finmax Trafo & Metal, a manufacturer-to-manufacturer production partner for transformer tanks, corrugated walls and heavy metal fabrication.",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-grid">
      <section className="relative overflow-hidden border-b border-white/10 hero-grain">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#070a0f]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-24 md:pb-18 md:pt-28">
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Manufacturer-to-Manufacturer Üretim Ortağınız
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-400 md:text-lg md:leading-8">
            Finmax Trafo & Metal İth. Tic. Ltd. Şti., çeyrek asrı aşan üretim
            tecrübesiyle trafo üreticileri için güvenilir bir üretim ortağı
            olarak faaliyet göstermektedir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-10">
            <div className="space-y-6 text-base leading-8 text-zinc-100">
              <p>
                Ana odağımız; trafo kazanı , dalga duvar ve kritik metal
                bileşenlerin , yüksek kalite standartlarında ve ölçeklenebilir
                üretim süreçleriyle imal edilmesidir.
              </p>
              <p>
                Şanlıurfa’da konumlanan 9.500 m² kapalı alan üzerine kurulu modern
                üretim tesislerimizde; dayanıklılık, sızdırmazlık ve uzun servis
                ömrü gerektiren ağır sanayi ürünleri, endüstriyel disiplin ve
                kontrol altında üretilmektedir.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                Üretim Yaklaşımımız
              </h2>
              <div className="mt-5 space-y-5 text-base leading-8 text-zinc-100">
                <p>
                  Finmax’ta üretim yalnızca imalat değil, tekrar edilebilir
                  kalite ve ölçeklenebilir kapasite anlayışıyla ele alınır.
                </p>
                <ul className="space-y-3 text-base leading-7 text-zinc-400">
                  <li>Kontrollü kaynak ve montaj süreçleri</li>
                  <li>Sızdırmazlık ve mekanik dayanım odaklı üretim</li>
                  <li>OEM gereksinimlerine uygun dokümantasyon altyapısı</li>
                  <li>Projeye özel ölçü, kalınlık ve konfigürasyon esnekliği</li>
                </ul>
                <p>
                  Bu yaklaşım sayesinde Finmax, yerel ve uluslararası trafo
                  üreticileri için uzun vadeli bir çözüm ortağı konumundadır.
                </p>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                Hizmet ve Üretim Alanlarımız
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-zinc-400">
                <li>Dalga duvar üretimi</li>
                <li>Dalga duvarlı ve düz duvarlı trafo kazanı imalatı</li>
                <li>AG / YG sargı makineleri üretimi</li>
                <li>Trafo vakumlu kurutma fırınları</li>
                <li>Vakumlu yağ doldurma odaları</li>
                <li>Yağ tasfiye makineleri</li>
                <li>Trafo aksesuarları ve metal bileşen üretimi</li>
              </ul>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                Bölgesel Güç & İhracat Yetkinliği
              </h2>
              <div className="mt-5 space-y-5 text-base leading-8 text-zinc-100">
                <p>
                  Şanlıurfa’nın Orta Doğu ve Körfez pazarlarına yakın konumu
                  sayesinde Finmax, hızlı teslimat ve lojistik avantaj sunar.
                </p>
                <p>
                  İhracat odaklı üretim yaklaşımımız; paketleme, yükleme ve
                  sevkiyat süreçlerinde OEM zaman çizelgelerine uyum sağlar.
                </p>
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <div className="space-y-5 text-base leading-8 text-zinc-100">
                <p>
                  Finmax Trafo & Metal, üreticiden üreticiye iş modelinde;
                  kapasite, kalite ve süreklilik arayan firmalar için tasarlanmış
                  bir üretim altyapısı sunar.
                </p>
              </div>
            </div>
          </div>

          <div className="md:sticky md:top-24">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="relative aspect-[16/11]">
                <Image
                  src="/media/Enhanced Industrial Manufacturing - 4_3 (1).jpg"
                  alt="Finmax production facility overview"
                  fill
                  className="object-cover contrast-125"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
            </div>
            <div className="mt-4 text-sm leading-6 text-zinc-400">
              9.500 m² kapalı alan üzerine kurulu modern üretim tesisi.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function KvkkModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-ink/55 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kvkk-title"
      onClick={onClose}
    >
      <div
        className="modal-pop flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-[22px] bg-paper shadow-[0_28px_72px_-16px_rgba(26,26,26,0.32)]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-ink/8 px-7 pb-4 pt-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/45">
              Aydınlatma Metni
            </span>
            <h2
              id="kvkk-title"
              className="mt-1 font-heading text-2xl font-bold tracking-tight text-ink"
            >
              KVKK Kapsamında Bilgilendirme
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-ink/40 transition hover:bg-ink/5 hover:text-ink"
            aria-label="Kapat"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="overflow-y-auto px-7 py-6 text-[13.5px] leading-relaxed text-ink/80">
          <p className="text-ink/65">
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
            kapsamında, etkinliğe katılımın gerektirdiği kişisel veri işleme
            faaliyetleri hakkında sizi bilgilendirmek isteriz.
          </p>

          <Section title="Veri Sorumlusu">
            Bu etkinliği düzenleyen{" "}
            <strong>Yıldız Teknik Üniversitesi Ekstrem Sporlar Kulübü</strong>{" "}
            (&quot;Kulüp&quot;), KVKK kapsamında veri sorumlusu sıfatıyla
            hareket etmektedir. Kulüp adına teknik altyapı SKY LAB tarafından
            işletilmektedir.
          </Section>

          <Section title="İşlenen Kişisel Veriler">
            <ul className="ml-1 list-inside list-disc space-y-1">
              <li>
                <strong>Kimlik:</strong> Ad-soyad
              </li>
              <li>
                <strong>İletişim:</strong> YTÜ öğrenci e-postası
                (@std.yildiz.edu.tr), telefon numarası
              </li>
              <li>
                <strong>Etkinlik kayıtları:</strong> Tamamlanan kilometre,
                kullanılan araç tipi (bisiklet, paten, kaykay, koşu), katılım
                tarihi ve saati
              </li>
              <li>
                <strong>Ekipman kayıtları:</strong> Tarafınıza atanan ekipman
                kodu, teslim ve iade zamanları
              </li>
              <li>
                <strong>Görsel kanıt:</strong> Uzaktan katılım için yüklediğiniz
                etkinlik kanıt görseli (ör. fitness uygulaması ekran görüntüsü)
              </li>
            </ul>
          </Section>

          <Section title="İşleme Amaçları">
            <ul className="ml-1 list-inside list-disc space-y-1">
              <li>Etkinliğe katılımınızın kaydedilmesi ve sürdürülmesi</li>
              <li>Stant ekipmanlarının atama ve iade takibi</li>
              <li>
                Bildirdiğiniz kilometrenin doğrulanması ve liderlik tablosunun
                üretilmesi
              </li>
              <li>
                5000&nbsp;km ortak hedefine ulaşılması halinde kampüs ormanı
                organizasyonunun yürütülmesi
              </li>
              <li>Etkinlik süresince ve sonrasındaki duyuru iletişimi</li>
            </ul>
          </Section>

          <Section title="Hukuki Sebep">
            <ul className="ml-1 list-inside list-disc space-y-1">
              <li>
                <strong>Açık rızanız</strong> (görsel kanıt yüklemesi ve
                liderlik tablosunda ad-soyad ile yer alma)
              </li>
              <li>
                <strong>Sözleşmenin kurulması ve ifası</strong> (etkinliğe
                katılım ve ekipman teslimi)
              </li>
              <li>
                <strong>Meşru menfaat</strong> (ekipman güvenliği, suistimal
                önleme)
              </li>
            </ul>
          </Section>

          <Section title="Verilerin Paylaşımı">
            <ul className="ml-1 list-inside list-disc space-y-1">
              <li>
                <strong>Liderlik tablosu:</strong> Onaylanan etkinlik
                kayıtlarınız (ad-soyad + toplam kilometre + araç tipi) etkinlik
                süresince ve sonrasında platformda kamuya açık şekilde
                yayınlanır.
              </li>
              <li>
                <strong>Kanıt görselleri:</strong> Yalnızca Kulüp yönetimi
                (admin) tarafından kanıt doğrulama amacıyla görüntülenir; üçüncü
                kişilerle paylaşılmaz, kamuya açılmaz.
              </li>
              <li>
                <strong>E-posta ve telefon:</strong> Üçüncü kişilerle
                paylaşılmaz; yalnızca etkinlik organizasyonu için kullanılır.
              </li>
              <li>
                <strong>Altyapı:</strong> Veriler Supabase Inc. tarafından
                sağlanan bulut altyapısı üzerinde saklanır. Bu metni
                onaylamanızla verilerinizin yurt dışına aktarılmasına da rıza
                vermiş olursunuz.
              </li>
            </ul>
          </Section>

          <Section title="Saklama Süresi">
            <ul className="ml-1 list-inside list-disc space-y-1">
              <li>
                Profil ve etkinlik kayıtları, etkinliğin bitimini takip eden{" "}
                <strong>1 yıl</strong> içinde anonimleştirilir veya silinir.
              </li>
              <li>
                Yüklediğiniz kanıt görselleri, etkinliğin bitiminden itibaren{" "}
                <strong>30 gün</strong> içinde silinir.
              </li>
              <li>
                İstediğiniz zaman aşağıdaki iletişim adresinden verilerinizin
                silinmesini talep edebilirsiniz.
              </li>
            </ul>
          </Section>

          <Section title="Haklarınız (KVKK Madde 11)">
            <p className="mb-2">Aşağıdaki haklara sahipsiniz:</p>
            <ul className="ml-1 list-inside list-disc space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>
                İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını
                öğrenme
              </li>
              <li>Aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmiş ise düzeltilmesini isteme</li>
              <li>
                KVKK&apos;da öngörülen şartlar çerçevesinde silinmesini veya yok
                edilmesini isteme
              </li>
              <li>
                İşlenen verilerin münhasıran otomatik sistemlerle analiz
                edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz
                etme
              </li>
              <li>
                Kanuna aykırı işlenme sonucu uğradığınız zararın giderilmesini
                talep etme
              </li>
            </ul>
          </Section>

          <Section title="İletişim">
            <p>
              Bu metin kapsamındaki tüm talep ve başvurularınız için{" "}
              <strong>Ekstrem Sporlar Kulübü</strong> ile aşağıdaki kanallar
              üzerinden iletişime geçebilirsiniz:
            </p>
            <ul className="ml-1 mt-2 list-inside list-disc space-y-1">
              <li>
                E-posta:{" "}
                <a
                  href="mailto:ekstrem@std.yildiz.edu.tr"
                  className="text-sky-deep underline underline-offset-2 hover:text-ink"
                >
                  ytuekstremsporlar@gmail.com
                </a>
              </li>
              <li>
                Telefon:{" "}
                <a
                  href="tel:+905333483899"
                  className="text-sky-deep underline underline-offset-2 hover:text-ink"
                >
                  0533 348 38 99
                </a>
              </li>
              <li>
                Instagram:{" "}
                <a
                  href="https://instagram.com/ytu.ekstrem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-deep underline underline-offset-2 hover:text-ink"
                >
                  @ytu.ekstrem
                </a>
              </li>
            </ul>
          </Section>

          <p className="mt-8 text-[11.5px] text-ink/45">
            Son güncelleme: 19 Mayıs 2026
          </p>
        </div>

        <footer className="flex justify-end border-t border-ink/8 bg-paper-warm/40 px-7 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/85 active:scale-[0.97]"
          >
            Anladım
          </button>
        </footer>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h3 className="mb-2 font-heading text-[15px] font-bold tracking-tight text-ink">
        {title}
      </h3>
      <div className="text-ink/75">{children}</div>
    </section>
  );
}

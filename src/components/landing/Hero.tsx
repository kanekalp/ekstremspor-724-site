"use client";

import { Arrow, HeroScene, StampBadge } from "@/components/illustrations";
import { EquipmentBand } from "@/components/landing/EquipmentBand";

type Props = {
  isAuthed: boolean;
  onPrimary: () => void;
};

export function Hero({ isAuthed, onPrimary }: Props) {
  return (
    <section className="relative min-h-155 overflow-hidden sm:min-h-170">
      <div className="pointer-events-none absolute inset-0">
        <HeroScene animated />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 60% at 50% 30%, var(--hero-scrim) 0%, transparent 68%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-paper" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 pb-32 pt-24 text-center sm:pb-36">
        <div className="hero-rise hero-rise-1">
          <StampBadge rotate={-2}>
            18-21 Mayıs 2026 · Davutpaşa Kampüsü · Festival Alanı ve Yemekhane
            Önü
          </StampBadge>
        </div>

        <h1
          className="hero-rise hero-rise-2 font-heading text-[clamp(2.75rem,6.8vw,5.25rem)] font-bold leading-[0.95] tracking-[-0.04em] text-balance"
          style={{
            color: "var(--hero-text)",
            textShadow: "var(--hero-h1-shadow)",
            transition: "text-shadow 2s ease-in-out",
          }}
        >
          Kilometreni kaydet,
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">zirveye çık.</span>
            <span className="absolute -inset-x-1.5 bottom-1.5 z-0 h-4 rounded bg-sun opacity-90" />
          </span>
        </h1>

        <p
          className="hero-rise hero-rise-3 max-w-2xl mx-auto text-center text-[1.05rem] leading-[1.8] tracking-wide antialiased px-4"
          style={{
            color: "var(--hero-text-soft)",
            textShadow: "var(--hero-subtitle-shadow)",
            transition: "text-shadow 2s ease-in-out",
          }}
        >
          Bisiklet, paten, kaykay ya da koşu — neyle gidersen git.{" "}
          <br className="hidden sm:block" />
          Kilometreni topla, liderlik tablosunda yüksel, üç günün sonunda bir
          orman kazandır.
        </p>

        <div className="hero-rise hero-rise-4 mt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onPrimary}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-base font-semibold text-paper shadow-[0_16px_36px_-12px_rgba(0,0,0,0.55)] transition hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-[0_22px_44px_-12px_rgba(0,0,0,0.6)] active:translate-y-0 active:scale-[0.98]"
          >
            {isAuthed ? "Sürüş Ekle" : "Hemen kaydol"}
            <span className="inline-block transition-transform group-hover:translate-x-0.5">
              <Arrow size={15} color="currentColor" />
            </span>
          </button>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-6 py-3.5 text-[15px] font-medium text-ink backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/90"
          >
            Nasıl çalışıyor?
          </a>
        </div>

        <div className="hero-rise hero-rise-4 mt-3">
          <EquipmentBand />
        </div>
      </div>
    </section>
  );
}

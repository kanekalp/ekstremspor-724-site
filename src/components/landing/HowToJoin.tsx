const STEPS = [
  {
    n: "01",
    t: "Kayıt ol",
    d: "Birkaç bilgiyle 30 saniyede kaydını tamamla. Ekipman ihtiyacın varsa formda işaretle.",
  },
  {
    n: "02",
    t: "Kampüse gel",
    d: "Stanttan ekipmanını teslim al ve başla. Uzaktan katılıyorsan aktiviteni yükle.",
  },
  {
    n: "03",
    t: "Ormana fidan ekle",
    d: "Her kilometre liderlik tablosunda senin için sayılır ve ortak hedefe dokunur. Hedef tamamlandığında doğaya birlikte bir orman kazandırırız.",
  },
];

export function HowToJoin() {
  return (
    <section
      id="how"
      className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24"
    >
      <div className="text-[11px] font-semibold uppercase tracking-widest text-ink/60">
        Nasıl Katılırım
      </div>
      <h2 className="mt-1.5 max-w-xl font-heading text-[clamp(2.25rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.03em]">
        Üç adımda etkinliğin parçasısın.
      </h2>
      <div className="mt-7 grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="flex flex-col gap-2.5 rounded-[20px] border border-ink/5 bg-white p-7 shadow-[0_12px_32px_-16px_rgba(26,26,26,0.15)]"
          >
            <div className="font-heading text-[40px] font-semibold leading-none tracking-[-0.03em] text-sun">
              {s.n}
            </div>
            <div className="text-xl font-semibold tracking-[-0.01em]">
              {s.t}
            </div>
            <div className="text-sm leading-relaxed text-ink/70">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

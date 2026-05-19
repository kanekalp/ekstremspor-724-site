import { KosturanziLogo } from "@/components/ui/KosturanziLogo";
import { KvkkLink } from "@/components/ui/KvkkLink";

export function Footer() {
  return (
    <footer className="bg-ink border-t border-paper/10">
      <div className="mx-auto max-w-5xl px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-paper/10 py-5">
          <div className="flex items-center gap-3">
            <span className="font-heading text-[11px] font-semibold tracking-wide text-paper/65">
              Ekstrem Sporlar Kulübü
            </span>
            <a
              href="https://instagram.com/ytu.ekstrem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-widest text-paper/30 transition-colors hover:text-sky"
            >
              @ytu.ekstrem
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center overflow-hidden rounded-sm border border-sky/25">
              <span className="bg-sky/10 px-2 py-0.5 font-heading text-[9px] font-bold tracking-[0.18em] text-sky">
                SKY LAB
              </span>
              <span className="border-l border-sky/20 px-2 py-0.5 text-[9px] tracking-[0.14em] text-sky/50">
                WEBLAB
              </span>
            </div>
            <a
              href="https://instagram.com/ytuskylab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-widest text-paper/30 transition-colors hover:text-sky"
            >
              @ytuskylab
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4 text-paper/30">
            <KosturanziLogo size="sm" invert />
            <span className="font-heading text-xs tracking-widest">2026</span>
            <span className="text-paper/20">·</span>
            <KvkkLink className="text-[10px] tracking-wide transition-colors hover:text-paper/80 cursor-pointer">
              KVKK
            </KvkkLink>
          </div>
          <a
            href="https://github.com/kanekalp"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center text-[10px] tracking-[0.2em] text-paper/30"
          >
            <div className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-in-out group-hover:grid-cols-[1fr]">
              <span
                className="flex items-center overflow-hidden whitespace-nowrap text-sun opacity-0 transition-all duration-500 group-hover:pr-2 group-hover:opacity-100"
                aria-hidden="true"
              >
                ⚡
              </span>
            </div>
            <span className="whitespace-nowrap font-heading font-bold tracking-widest transition-all duration-300 group-hover:text-paper group-hover:drop-shadow-[0_0_8px_var(--color-sun)]">
              kaneka yapmis
            </span>
            <div className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-in-out group-hover:grid-cols-[1fr]">
              <span
                className="flex items-center overflow-hidden whitespace-nowrap text-sun opacity-0 transition-all duration-500 group-hover:pl-2 group-hover:opacity-100"
                aria-hidden="true"
              >
                {`</>`}
              </span>
            </div>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-sun shadow-[0_0_5px_var(--color-sun)] transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </footer>
  );
}

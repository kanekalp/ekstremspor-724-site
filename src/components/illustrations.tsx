import { useId } from "react";
import type { VehicleType } from "@/lib/types";

type GlyphProps = {
  color?: string;
  accent?: string;
  className?: string;
};

export function BikeGlyph({
  color = "currentColor",
  accent,
  className,
}: GlyphProps) {
  const a = accent ?? color;
  return (
    <svg
      viewBox="0 0 100 70"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="22" cy="50" r="16" />
      <circle cx="78" cy="50" r="16" />
      <circle cx="22" cy="50" r="2" fill={color} />
      <circle cx="78" cy="50" r="2" fill={color} />
      <path d="M22 50 L48 50 L40 22 L62 22 L78 50" />
      <path d="M48 50 L62 22" />
      <path d="M36 22 L46 22" />
      <path d="M62 22 L70 16" />
      <circle cx="48" cy="50" r="2.5" fill={a} stroke="none" />
    </svg>
  );
}

export function SkateboardGlyph({
  color = "currentColor",
  accent,
  className,
}: GlyphProps) {
  const a = accent ?? color;
  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="8"
        y="22"
        width="84"
        height="12"
        rx="6"
        fill={a}
        stroke={color}
      />
      <line x1="22" y1="34" x2="22" y2="40" />
      <line x1="78" y1="34" x2="78" y2="40" />
      <circle cx="22" cy="46" r="6" fill={color} />
      <circle cx="78" cy="46" r="6" fill={color} />
      <g fill={color} opacity="0.4" stroke="none">
        {[20, 32, 44, 56, 68, 80].map((x) => (
          <circle key={x} cx={x} cy="28" r="0.9" />
        ))}
      </g>
    </svg>
  );
}

export function SkatesGlyph({
  color = "currentColor",
  accent,
  className,
}: GlyphProps) {
  const a = accent ?? color;
  return (
    <svg
      viewBox="0 0 100 70"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 18 18 L 18 36 L 14 42 L 14 50 L 86 50 L 86 42 L 78 38 L 60 38 L 60 18 Z"
        fill={a}
        stroke={color}
      />
      <line x1="28" y1="24" x2="50" y2="24" />
      <line x1="28" y1="30" x2="50" y2="30" />
      <line x1="28" y1="36" x2="50" y2="36" />
      <line x1="14" y1="54" x2="86" y2="54" />
      <circle cx="24" cy="60" r="6" fill={color} />
      <circle cx="44" cy="60" r="6" fill={color} />
      <circle cx="64" cy="60" r="6" fill={color} />
      <circle cx="80" cy="60" r="6" fill={color} />
    </svg>
  );
}

export function RunnerGlyph({
  color = "currentColor",
  accent,
  className,
}: GlyphProps) {
  const a = accent ?? color;
  return (
    <svg
      viewBox="0 0 100 70"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="58" cy="14" r="6" fill={a} stroke={color} />
      <path d="M56 20 L48 40" />
      <path d="M53 26 L64 22 L68 14" />
      <path d="M53 26 L42 32 L36 40" />
      <path d="M48 40 L62 50 L68 60" />
      <path d="M48 40 L36 50 L26 58" />
      <path d="M14 30 L24 30" opacity="0.4" />
      <path d="M10 42 L20 42" opacity="0.4" />
    </svg>
  );
}

export function VehicleGlyph({
  type,
  ...rest
}: GlyphProps & { type: VehicleType }) {
  if (type === "bicycle") return <BikeGlyph {...rest} />;
  if (type === "skates") return <SkatesGlyph {...rest} />;
  if (type === "running") return <RunnerGlyph {...rest} />;
  return <SkateboardGlyph {...rest} />;
}

export function Arrow({
  size = 14,
  color = "currentColor",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

export function StampBadge({
  children,
  rotate = -2,
}: {
  children: React.ReactNode;
  rotate?: number;
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]"
      style={{
        transform: `rotate(${rotate}deg)`,
        borderColor: "color-mix(in oklab, var(--hero-text) 50%, transparent)",
        background: "var(--hero-scrim)",
        color: "var(--hero-text)",
      }}
    >
      {children}
    </div>
  );
}

export function HeroScene({ animated = true }: { animated?: boolean }) {
  const id = useId().replace(/[:]/g, "");

  const bottomWindows = [
    37.3, 89.5, 141.8, 194, 246.3, 298.5, 350.8, 403, 455.2, 507.5, 671, 723.3,
    775.5, 827.8, 880, 932.3, 984.5, 1036.8, 1089, 1141.2,
  ];
  const sideWindows = [
    505.9, 669.7, 722, 774.2, 826.5, 878.7, 931, 983.2, 1035.5, 1087.7, 1140,
    453.6, 401.4, 349.1, 296.9, 244.6, 192.4, 140.1, 87.9, 35.7,
  ];
  const pipes = [438.9, 125.5, 761.1, 1074.5];

  const trees = [
    { cx: 460, cy: 642, scale: 0.65 },
    { cx: 740, cy: 642, scale: 0.65 },
    { cx: 90, cy: 650, scale: 0.8 },
    { cx: 1110, cy: 650, scale: 0.8 },
    { cx: 240, cy: 685, scale: 1.4 },
    { cx: 960, cy: 685, scale: 1.4 },
  ];

  const bushes = [
    { cx: 410, cy: 640, r: 14 },
    { cx: 790, cy: 640, r: 14 },
    { cx: 140, cy: 645, r: 18 },
    { cx: 1060, cy: 645, r: 18 },
    { cx: 320, cy: 655, r: 24 },
    { cx: 880, cy: 655, r: 24 },
  ];

  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMax slice"
      className="block h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--hero-sky-top)" />
          <stop offset="100%" stopColor="var(--hero-sky-bottom)" />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="var(--color-sun)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="var(--color-sun)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-sun)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="700" fill={`url(#${id}-sky)`} />

      <g
        style={{
          opacity: "var(--hero-sun-opacity)",
          transformOrigin: "700px 240px",
          animation: animated ? "sunPulse 8s ease-in-out infinite" : "none",
          willChange: animated ? "transform, opacity" : "auto",
        }}
      >
        <circle cx="700" cy="240" r="180" fill={`url(#${id}-sun)`} />
        <circle
          className="hero-sun-core"
          cx="700"
          cy="240"
          r="60"
          opacity="0.9"
        />
      </g>

      <g fill="#ffffff" opacity="0.6">
        {animated && (
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-200 0"
            to="1500 0"
            dur="120s"
            begin="-30s"
            repeatCount="indefinite"
          />
        )}
        <circle cx="100" cy="260" r="20" />
        <circle cx="130" cy="250" r="28" />
        <circle cx="160" cy="265" r="18" />
        <circle cx="120" cy="270" r="22" />
      </g>

      <g fill="#ffffff" opacity="0.8">
        {animated && (
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-160 0"
            to="1400 0"
            dur="90s"
            begin="-15s"
            repeatCount="indefinite"
          />
        )}
        <circle cx="450" cy="210" r="16" />
        <circle cx="475" cy="200" r="24" />
        <circle cx="500" cy="215" r="18" />
      </g>

      <g fill="#ffffff" opacity="0.9">
        {animated && (
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-160 0"
            to="1400 0"
            dur="65s"
            begin="-5s"
            repeatCount="indefinite"
          />
        )}
        <circle cx="850" cy="230" r="22" />
        <circle cx="885" cy="220" r="32" />
        <circle cx="920" cy="235" r="24" />
        <circle cx="870" cy="245" r="20" />
      </g>

      <g fill="#ffffff" opacity="0.4">
        {animated && (
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-200 0"
            to="1500 0"
            dur="140s"
            begin="-75s"
            repeatCount="indefinite"
          />
        )}
        <circle cx="200" cy="180" r="12" />
        <circle cx="220" cy="175" r="16" />
        <circle cx="240" cy="185" r="10" />
      </g>

      <polygon
        points="0,400 181,350 321,380 481,345 641,385 801,355 981,390 1201,360 1201,458 0,458"
        fill="var(--hero-mountain)"
        opacity="0.3"
      />
      <polygon
        points="0,430 141,380 281,410 441,380 601,415 761,390 921,420 1081,390 1201,410 1201,490 0,490"
        fill="var(--hero-mountain)"
        opacity="0.6"
      />

      <g
        style={{
          transformOrigin: "600px 700px",
          animation: animated ? "hillSway 14s ease-in-out infinite" : "none",
          willChange: animated ? "transform" : "auto",
        }}
      >
        <path
          d="M-40,440 C150,390 350,400 550,450 C750,500 950,460 1220,410 V720 H-40 Z"
          fill="var(--hero-mountain)"
          opacity="0.75"
        />
        <path
          d="M-20,460 C120,420 300,420 480,450 C660,480 800,470 950,430 C1100,390 1200,420 1220,470 V720 H-20 Z"
          fill="var(--hero-mountain)"
          opacity="0.85"
        />
        <path
          d="M-20,492 C180,450 380,450 600,470 S1000,490 1220,470 V720 H-20 Z"
          fill="var(--hero-mountain)"
          opacity="1"
        />
      </g>

      <g fill="var(--hero-mountain)" opacity="0.5">
        {[118, 338, 778, 1048].map((x, i) => (
          <g key={i}>
            <rect x={x} y={i % 2 === 0 ? 560 : 572} width="4" height="14" />
            <polygon
              points={`${x - 10},${i % 2 === 0 ? 562 : 574} ${x + 14},${
                i % 2 === 0 ? 562 : 574
              } ${x + 2},${i % 2 === 0 ? 534 : 546}`}
              fill="var(--hero-mountain)"
              stroke="#000"
              strokeOpacity="0.2"
            />
          </g>
        ))}
      </g>

      <g id="tasbina">
        <rect className="b-wall" x="0" y="451.4" width="1200" height="186.4" />
        <rect className="b-line" x="0" y="449.9" width="1200" height="3.3" />
        <rect className="b-line" x="0" y="554.2" width="1200" height="3.3" />
        <rect className="b-shadow" x="0" y="557.5" width="1200" height="4" />
        <rect className="b-shadow" x="0" y="453.3" width="1200" height="15" />

        <g id="altpencereler">
          {bottomWindows.map((x) => (
            <g key={`bw-${x}`}>
              <path
                className="b-shadow"
                d={`M${x},629.7v-32.5c1.1-4.8,5.5-8.3,10.8-8.3s9.7,3.5,10.8,8.3h0v6.5s0,26,0,26h-21.6Z`}
              />
              <circle className="win-glass" cx={x + 10.8} cy="599.2" r="8.4" />
              <path
                className="win-frame"
                d={`M${x + 10.8},591.5c4.3,0,7.8,3.5,7.8,7.8s-3.5,7.8-7.8,7.8-7.8-3.5-7.8-7.8,3.5-7.8,7.8-7.8M${
                  x + 10.8
                },590.2c-5,0-9,4-9,9s4,9,9,9,9-4,9-9-4-9-9-9Z`}
              />
              <line
                className="win-stroke"
                x1={x + 10.8}
                y1="600.1"
                x2={x + 10.8}
                y2="590.3"
              />
              <line
                className="win-stroke"
                x1={x + 17}
                y1="594"
                x2={x + 10.8}
                y2="600.2"
              />
              <line
                className="win-stroke"
                x1={x + 4.3}
                y1="593.6"
                x2={x + 10.5}
                y2="599.8"
              />
              <rect
                className="win-glass"
                x={x + 2.4}
                y="599.9"
                width="7.8"
                height="26.5"
              />
              <path
                className="win-frame"
                d={`M${x + 9.5},600.5v25.2h-6.5v-25.2h6.5M${
                  x + 10.8
                },599.2h-9v27.7h9v-27.7Z`}
              />
              <line
                className="win-stroke"
                x1={x + 1.7}
                y1="608.7"
                x2={x + 10.8}
                y2="608.7"
              />
              <line
                className="win-stroke"
                x1={x + 1.7}
                y1="617.5"
                x2={x + 10.8}
                y2="617.5"
              />
              <rect
                className="win-glass"
                x={x + 11.4}
                y="599.9"
                width="7.8"
                height="26.5"
              />
              <path
                className="win-frame"
                d={`M${x + 18.6},600.5v25.2h-6.5v-25.2h6.5M${
                  x + 19.8
                },599.2h-9v27.7h9v-27.7Z`}
              />
              <line
                className="win-stroke"
                x1={x + 10.8}
                y1="608.7"
                x2={x + 19.8}
                y2="608.7"
              />
              <line
                className="win-stroke"
                x1={x + 10.8}
                y1="617.5"
                x2={x + 19.8}
                y2="617.5"
              />
            </g>
          ))}
        </g>

        <g id="merkezpencere">
          <path
            className="b-shadow"
            d="M581.7,537.4v-47.7h0c1.9-8.1,9.3-14,18.3-14s16.4,5.9,18.3,14h0v3.7s0,44,0,44h-36.6Z"
          />
          <path
            className="win-glass"
            d="M600,507.2c-7.6,0-13.8-6.2-13.8-13.8s6.2-13.8,13.8-13.8,13.8,6.2,13.8,13.8-6.2,13.8-13.8,13.8Z"
          />
          <path
            className="win-frame"
            d="M600,480.6c7.1,0,12.8,5.8,12.8,12.8s-5.8,12.8-12.8,12.8-12.8-5.8-12.8-12.8,5.8-12.8,12.8-12.8M600,478.8c-8.1,0-14.7,6.6-14.7,14.7s6.6,14.7,14.7,14.7,14.7-6.6,14.7-14.7-6.6-14.7-14.7-14.7Z"
          />
          <line
            className="win-stroke"
            style={{ strokeWidth: "1.9px" }}
            x1="600"
            y1="494.8"
            x2="600"
            y2="478.9"
          />
          <line
            className="win-stroke"
            style={{ strokeWidth: "1.9px" }}
            x1="610.1"
            y1="484.9"
            x2="600"
            y2="495"
          />
          <line
            className="win-stroke"
            style={{ strokeWidth: "1.9px" }}
            x1="589.4"
            y1="484.3"
            x2="599.5"
            y2="494.4"
          />
          <rect
            className="win-dark-bg"
            x="600.9"
            y="514.3"
            width="12.8"
            height="19.5"
          />
          <path
            className="win-frame"
            d="M612.8,515.2v17.6h-11v-17.6h11M614.7,513.3h-14.7v21.4h14.7v-21.4Z"
          />
          <rect
            className="win-glass"
            x="586.2"
            y="494.6"
            width="12.8"
            height="19.5"
          />
          <path
            className="win-frame"
            d="M598.1,495.5v17.6h-11v-17.6h11M600,493.7h-14.7v21.4h14.7v-21.4Z"
          />
          <line
            className="win-stroke"
            style={{ strokeWidth: "1.9px" }}
            x1="585.3"
            y1="504.4"
            x2="600"
            y2="504.4"
          />
          <rect
            className="win-glass"
            x="586.2"
            y="514.3"
            width="12.8"
            height="19.5"
          />
          <path
            className="win-frame"
            d="M598.1,515.2v17.6h-11v-17.6h11M600,513.3h-14.7v21.4h14.7v-21.4Z"
          />
          <line
            className="win-stroke"
            style={{ strokeWidth: "1.9px" }}
            x1="585.3"
            y1="524"
            x2="600"
            y2="524"
          />
          <rect
            className="win-glass"
            x="600.9"
            y="494.6"
            width="12.8"
            height="19.5"
          />
          <path
            className="win-frame"
            d="M612.8,495.5v17.6h-11v-17.6h11M614.7,493.7h-14.7v21.4h14.7v-21.4Z"
          />
          <line
            className="win-stroke"
            style={{ strokeWidth: "1.9px" }}
            x1="600"
            y1="504.4"
            x2="614.7"
            y2="504.4"
          />
        </g>

        <g id="yanpencereler">
          {sideWindows.map((x) => (
            <g key={`sw-${x}`}>
              <path
                className="b-shadow"
                d={`M${x},537.1v-48.4c1.3-5.5,6.3-9.5,12.4-9.5s11.1,4,12.4,9.5h0v18.5s0,29.9,0,29.9h-24.8Z`}
              />
              <path
                className="win-glass"
                d={`M${x + 12.4},500.8c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8,9.8,4.4,9.8,9.8-4.4,9.8-9.8,9.8Z`}
              />
              <path
                className="win-frame"
                d={`M${x + 12.4},481.9c5,0,9.2,4.1,9.2,9.2s-4.1,9.2-9.2,9.2-9.2-4.1-9.2-9.2,4.1-9.2,9.2-9.2M${
                  x + 12.4
                },480.6c-5.7,0-10.4,4.7-10.4,10.4s4.7,10.4,10.4,10.4,10.4-4.7,10.4-10.4-4.7-10.4-10.4-10.4Z`}
              />
              <line
                className="win-stroke"
                x1={x + 12.4}
                y1="492"
                x2={x + 12.4}
                y2="480.7"
              />
              <line
                className="win-stroke"
                x1={x + 19.5}
                y1="485"
                x2={x + 12.4}
                y2="492.1"
              />
              <line
                className="win-stroke"
                x1={x + 4.9}
                y1="484.6"
                x2={x + 12}
                y2="491.7"
              />
              <rect
                className="win-dark-bg"
                x={x + 13}
                y="513.5"
                width="9.2"
                height="21"
              />
              <path
                className="win-frame"
                d={`M${x + 21.5},514.1v19.8h-7.9v-19.8h7.9M${
                  x + 22.8
                },512.8h-10.4v22.3h10.4v-22.3Z`}
              />
              <rect
                className="win-dark-bg"
                x={x + 2.6}
                y="513.5"
                width="9.2"
                height="21"
              />
              <path
                className="win-frame"
                d={`M${x + 11.1},514.1v19.8h-7.9v-19.8h7.9M${
                  x + 12.4
                },512.8h-10.4v22.3h10.4v-22.3Z`}
              />
              <rect
                className="win-glass"
                x={x + 2.6}
                y="491.7"
                width="9.2"
                height="22.5"
              />
              <path
                className="win-frame"
                d={`M${x + 11.1},492.3v21.2h-7.9v-21.2h7.9M${
                  x + 12.4
                },491h-10.4v23.7h10.4v-23.7Z`}
              />
              <line
                className="win-stroke"
                x1={x + 2}
                y1="502.9"
                x2={x + 12.4}
                y2="502.9"
              />
              <rect
                className="win-glass"
                x={x + 13}
                y="491.7"
                width="9.2"
                height="22.5"
              />
              <path
                className="win-frame"
                d={`M${x + 21.5},492.3v21.2h-7.9v-21.2h7.9M${
                  x + 22.8
                },491h-10.4v23.7h10.4v-23.7Z`}
              />
              <line
                className="win-stroke"
                x1={x + 12.4}
                y1="502.9"
                x2={x + 22.8}
                y2="502.9"
              />
            </g>
          ))}
        </g>

        <rect
          className="b-entrance-bg"
          x="554.5"
          y="539.2"
          width="91"
          height="98.6"
        />
        <rect
          className="b-wall"
          x="565.4"
          y="539.2"
          width="69.2"
          height="98.6"
        />

        <g id="kapi">
          <path className="win-mid" d="M576,581.6 a24.4,21.4 0 0,1 48.8,0 Z" />
          <path
            className="win-line-dark"
            fill="none"
            d="M575.3,581.6 a25.1,22 0 0,1 50.2,0 M576.6,581.6 a23.8,20.8 0 0,1 47.6,0"
          />
          <path className="win-mid" d="M586,581.6 a14.4,12.6 0 0,1 28.8,0 Z" />
          <path
            className="win-line-dark"
            fill="none"
            d="M585.4,581.6 a15,13.2 0 0,1 30,0 M586.7,581.6 a13.7,11.9 0 0,1 27.4,0"
          />
          <line
            className="win-line-dark"
            fill="none"
            x1="600.4"
            y1="581.6"
            x2="600.4"
            y2="559.8"
          />
          <line
            className="win-line-dark"
            fill="none"
            x1="619"
            y1="567.4"
            x2="600.4"
            y2="581.6"
          />
          <line
            className="win-line-dark"
            fill="none"
            x1="581.8"
            y1="567.4"
            x2="600.5"
            y2="581.6"
          />
          <rect
            className="win-deep"
            x="576"
            y="582.2"
            width="11.3"
            height="55"
          />
          <path
            className="win-frame-dark"
            d="M586.6,582.8v53.8h-10v-53.8h10M587.9,581.5h-12.5v56.3h12.5v-56.3Z"
          />
          <line
            className="win-stroke-thick"
            fill="none"
            x1="575.8"
            y1="600.2"
            x2="587.9"
            y2="600.2"
          />
          <line
            className="win-stroke-thick"
            fill="none"
            x1="575.3"
            y1="619.1"
            x2="587.4"
            y2="619.1"
          />
          <rect
            className="win-deep"
            x="588"
            y="582.2"
            width="11.8"
            height="55"
          />
          <path
            className="win-frame-dark"
            d="M599.1,582.8v53.8h-10.5v-53.8h10.5M600.4,581.5h-13v56.3h13v-56.3Z"
          />
          <line
            className="win-stroke-thick"
            fill="none"
            x1="587.9"
            y1="600.2"
            x2="600.4"
            y2="600.2"
          />
          <line
            className="win-stroke-thick"
            fill="none"
            x1="587.4"
            y1="619.1"
            x2="599.9"
            y2="619.1"
          />
          <rect
            className="win-deep"
            x="601"
            y="582.2"
            width="11.8"
            height="55"
          />
          <path
            className="win-frame-dark"
            d="M612.1,582.8v53.8h-10.5v-53.8h10.5M613.4,581.5h-13v56.3h13v-56.3Z"
          />
          <line
            className="win-stroke-thick"
            fill="none"
            x1="612.9"
            y1="600.2"
            x2="600.4"
            y2="600.2"
          />
          <line
            className="win-stroke-thick"
            fill="none"
            x1="613.4"
            y1="619.1"
            x2="600.9"
            y2="619.1"
          />
          <rect
            className="win-deep"
            x="613.5"
            y="582.2"
            width="11.3"
            height="55"
          />
          <path
            className="win-frame-dark"
            d="M624.2,582.8v53.8h-10v-53.8h10M625.4,581.5h-12.5v56.3h12.5v-56.3Z"
          />
          <line
            className="win-stroke-thick"
            fill="none"
            x1="625"
            y1="600.2"
            x2="612.9"
            y2="600.2"
          />
          <line
            className="win-stroke-thick"
            fill="none"
            x1="625.4"
            y1="619.1"
            x2="613.4"
            y2="619.1"
          />
        </g>

        <rect
          className="b-shadow"
          x="553.3"
          y="542.4"
          width="93.1"
          height="4"
        />
        <rect
          className="b-line"
          x="553.3"
          y="539.1"
          width="93.1"
          height="3.3"
        />

        <g id="borular">
          {pipes.map((x, i) => {
            const shift = i === 2 || i === 3 ? -1.8 : 3.7;
            const points24 =
              i === 2 || i === 3
                ? `${x - 3.7} 637.8 ${x} 637.8 ${x} 472.7 ${x + 2.1} 461.3 ${
                    x + 2.1
                  } 451.4 ${x - 1.6} 451.4 ${x - 1.6} 461 ${x - 3.7} 472.3 ${
                    x - 3.7
                  } 637.8`
                : `${x + shift} 637.8 ${x} 637.8 ${x} 472.7 ${x - 2.1} 461.3 ${
                    x - 2.1
                  } 451.4 ${x + 1.6} 451.4 ${x + 1.6} 461 ${x + shift} 472.3 ${
                    x + shift
                  } 637.8`;
            const shift26 = i === 2 || i === 3 ? -3 : 3;
            const points26 =
              i === 2 || i === 3
                ? `${x - 3} 637.8 ${x + 0.7} 637.8 ${x + 0.7} 472.7 ${
                    x + 2.9
                  } 461.3 ${x + 2.9} 451.4 ${x - 0.9} 451.4 ${x - 0.9} 461 ${
                    x - 3
                  } 472.3 ${x - 3} 637.8`
                : `${x + shift26} 637.8 ${x - 0.7} 637.8 ${x - 0.7} 472.7 ${
                    x - 2.9
                  } 461.3 ${x - 2.9} 451.4 ${x + 0.9} 451.4 ${x + 0.9} 461 ${
                    x + shift26
                  } 472.3 ${x + shift26} 637.8`;

            return (
              <g key={`pipe-${x}`}>
                <polygon className="b-pipe-base" points={points24} />
                <polygon className="b-pipe-front" points={points26} />
              </g>
            );
          })}
        </g>

        <rect className="b-roof" x="0" y="426.2" width="1200" height="23.7" />
      </g>

      <g id="yol">
        <rect
          fill="var(--hero-mountain)"
          y="637.8"
          width="1200"
          height="330.5"
        />
        <polygon
          className="b-road"
          points="640,637.8 560,637.8 -200,1000 1400,1000"
        />

        {bushes.map((b, i) => {
          const isLeft = b.cx < 700;
          return (
            <g key={`bush-${i}`} transform={`translate(${b.cx}, ${b.cy})`}>
              <path
                d={`M -${b.r},0 A ${b.r} ${b.r} 0 0 1 ${b.r},0 Z`}
                fill="var(--hero-mountain)"
              />
              <path
                d={`M 0,-${b.r} A ${b.r} ${b.r} 0 0 1 ${b.r} 0 L 0,0 Z`}
                fill="#000"
                opacity="0.15"
                transform={isLeft ? "scale(-1, 1)" : "scale(1, 1)"}
              />
            </g>
          );
        })}

        {trees.map((t, i) => {
          const isLeft = t.cx < 700;
          return (
            <g
              key={`tree-${i}`}
              transform={`translate(${t.cx}, ${t.cy}) scale(${t.scale})`}
            >
              <ellipse
                cx={isLeft ? "-15" : "15"}
                cy="0"
                rx="35"
                ry="6"
                fill="#000"
                opacity="0.15"
              />

              <path
                d="M -3,0 L -2,-110 L 2,-110 L 3,0 Z"
                fill="var(--color-building-dark)"
                opacity="0.8"
              />

              <path
                d="M 0,-160 C 40,-160 60,-130 60,-100 C 80,-90 85,-50 60,-25 C 40,-5 15,-10 0,-15 C -15,-10 -40,-5 -60,-25 C -85,-50 -80,-90 -60,-100 C -60,-130 -40,-160 0,-160 Z"
                fill="var(--hero-mountain)"
              />

              <path
                d="M 0,-160 C 40,-160 60,-130 60,-100 C 80,-90 85,-50 60,-25 C 40,-5 15,-10 0,-15 V -160 Z"
                fill="#000"
                opacity="0.15"
                transform={isLeft ? "scale(-1, 1)" : "scale(1, 1)"}
              />
            </g>
          );
        })}
      </g>

      <g stroke="#000" fill="none">
        <line x1="-15.2" y1="387.1" x2="-10.9" y2="387.1" />
        <line x1="-15.2" y1="387.1" x2="-15.2" y2="387" />
        <line x1="-10.9" y1="387.1" x2="-10.9" y2="387" />
        <line x1="-15.2" y1="387.1" x2="-15.2" y2="389.1" />
        <line x1="-15.2" y1="387.1" x2="-15.1" y2="387.1" />
        <line x1="-15.2" y1="387.5" x2="-15.1" y2="387.5" />
        <line x1="-15.2" y1="387.9" x2="-15.1" y2="387.9" />
        <line x1="-15.2" y1="388.3" x2="-15.1" y2="388.3" />
        <line x1="-15.2" y1="388.7" x2="-15.1" y2="388.7" />
        <line x1="-15.2" y1="389.1" x2="-15.1" y2="389.1" />
        <rect x="-14.6" y="387.1" width="3.1" height="2" strokeWidth="0.5px" />
      </g>
    </svg>
  );
}

export function ModalScene({
  title,
  onClose,
}: {
  title: string;
  onClose?: () => void;
}) {
  return (
    <div
      className="relative h-22 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--hero-sky-top) 0%, var(--hero-sky-bottom) 100%)",
      }}
    >
      <svg
        viewBox="0 0 560 88"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle
          cx="470"
          cy="30"
          r="38"
          fill="var(--color-sun)"
          opacity="0.15"
        />
        <g style={{ opacity: "var(--hero-sun-opacity)" }}>
          <circle
            cx="470"
            cy="30"
            r="18"
            fill="var(--color-sun)"
            opacity="0.9"
          />
        </g>
        <circle cx="82" cy="30" r="10" fill="white" opacity="0.68" />
        <circle cx="98" cy="24" r="14" fill="white" opacity="0.78" />
        <circle cx="118" cy="30" r="10" fill="white" opacity="0.68" />
        <circle cx="101" cy="33" r="11" fill="white" opacity="0.62" />
        <polygon
          points="0,72 110,48 230,66 350,42 470,62 560,50 560,88 0,88"
          fill="var(--hero-mountain)"
          opacity="0.32"
        />
        <path
          d="M-10,78 C80,60 200,70 280,76 S460,72 570,68 L570,100 L-10,100Z"
          fill="var(--hero-mountain)"
          opacity="0.9"
        />
      </svg>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/80 text-xl leading-none text-ink shadow-sm backdrop-blur-sm hover:bg-white"
        >
          ×
        </button>
      )}

      <div className="absolute bottom-3 left-5 z-10">
        <span
          className="font-heading text-[19px] font-bold tracking-tight text-ink"
          style={{
            background: "rgba(255,255,255,0.72)",
            padding: "3px 10px",
            borderRadius: "7px",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

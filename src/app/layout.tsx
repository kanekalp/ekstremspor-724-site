import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeApplier } from "@/components/layout/ThemeApplier";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "7/24 Doğa İçin Hareket",
  description:
    "18-21 Mayıs tarihlerinde kesintisiz spor etkinliği, ister paten, kaykay, bisiklet sür istersen koş. Her kilometre 1 fidan olacak.",
  keywords: [
    "ekstrem sporlar",
    "bisiklet",
    "paten",
    "kaykay",
    "koşu",
    "kampüs",
    "YTÜ",
    "etkinlik",
    "orman",
    "ağaç dikme",
    "doğa",
    "sosyal sorumluluk",
  ],
  openGraph: {
    title: "7/24 Doğa İçin Hareket",
    description:
      "18-21 Mayıs tarihlerinde kesintisiz spor etkinliği. Her kilometre 1 fidan olacak. Bisiklet, paten, kaykay sür veya koş.",
    type: "website",
    siteName: "Ekstrem Sporlar Kulübü",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeBootstrap = `(function(){try{var h=new Date().getHours();var t=(h>=5&&h<7)?"dawn":(h>=7&&h<11)?"morning":(h>=11&&h<15)?"noon":(h>=15&&h<18)?"afternoon":(h>=18&&h<20)?"evening":(h>=20&&h<23)?"night":"midnight";document.documentElement.dataset.theme=t;}catch(e){}})();`;

  return (
    <html
      lang="tr"
      className={`${bricolage.variable} ${spaceGrotesk.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}

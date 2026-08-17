import type { Metadata } from "next";
import { Sora, Noto_Sans_Thai, Space_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-noto-sans-thai",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "PSAT HealthHacks 2026 - นวัตกรรมสุขภาพเพื่ออนาคต",
  description:
    "Health Hack 2026 เป็นพื้นที่สำหรับนักพัฒนาซอฟต์แวร์, บุคลากรทางการแพทย์, นักออกแบบ, และผู้ประกอบการ มาร่วมกันสร้างสรรค์นวัตกรรมเพื่อแก้ไขปัญหาความท้าทายในระบบสาธารณสุขของประเทศ",
  icons: {
    icon: "/images/psat-healthhacks-logo.png",
    shortcut: "/images/psat-healthhacks-logo.png",
    apple: "/images/psat-healthhacks-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`dark ${sora.variable} ${notoSansThai.variable} ${spaceMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-background text-on-surface font-hanken min-h-screen flex flex-col antialiased">
        {children}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          async
        />
      </body>
    </html>
  );
}

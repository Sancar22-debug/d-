import type { Metadata } from "next";
import { Geologica, Unbounded } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

// ============================================
// Font Configuration — Brand Book: Geologica (Body) & Unbounded (Hero Title)
// ============================================

const geologica = Geologica({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-geologica",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ============================================
// Global Metadata & Viewport
// ============================================

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "DOMINANT+ — строительная компания в Бишкеке",
  description:
    "Современные жилые проекты DOMINANT+ в Бишкеке. Строящиеся объекты, документы, планировки и консультация.",
  keywords: [
    "DOMINANT+",
    "строительная компания",
    "застройщик Бишкек",
    "жилые комплексы",
    "бизнес-класс",
    "новостройки Бишкек",
    "ORION",
    "квартиры Бишкек",
  ],
  authors: [{ name: "DOMINANT+" }],
  openGraph: {
    title: "DOMINANT+ — строительная компания в Бишкеке",
    description:
      "Современные жилые проекты DOMINANT+ в Бишкеке. Строящиеся объекты, документы, планировки и консультация.",
    type: "website",
    locale: "ru_KG",
  },
};

// ============================================
// Root Layout
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geologica.variable} ${unbounded.variable}`}>
      <body style={{ fontFamily: "var(--font-geologica), sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

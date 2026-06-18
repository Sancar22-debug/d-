import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

// ============================================
// Font Configuration
// ============================================

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable}`}>
      <body style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

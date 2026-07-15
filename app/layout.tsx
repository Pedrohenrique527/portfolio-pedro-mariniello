import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pedro Mariniello | Processos, Sistemas & Automação",
  description: "Portfólio de Pedro Mariniello, Analista de Sistemas especializado em planejamento, processos, automação e transformação digital.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Pedro Mariniello | Processos, Sistemas & Automação",
    description: "Processos claros e sistemas que avançam: planejamento, automação e transformação digital por Pedro Mariniello.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Pedro Mariniello — Processos claros. Sistemas que avançam." }],
  },
  twitter: { card: "summary_large_image", title: "Pedro Mariniello | Processos & Automação", description: "Planejamento, processos, automação e transformação digital.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}

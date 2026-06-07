import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keniart.example"),
  title: {
    default: "Keniart | Portafolio de arte contemporaneo",
    template: "%s | Keniart",
  },
  description:
    "Galeria digital silenciosa para explorar lienzos, series y dossier profesional de Keniart.",
  openGraph: {
    title: "Keniart | Portafolio de arte contemporaneo",
    description:
      "Obra disponible, series curatoriales y dossier profesional para galerias.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

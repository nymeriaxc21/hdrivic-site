import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HD RIVIC — Ingeniería Médica | Equipos de medicina regenerativa",
    template: "%s · HD RIVIC",
  },
  description:
    "HD RIVIC · Ingeniería Médica. Diseñamos y fabricamos equipos de medicina regenerativa: sistemas de ozonoterapia, camas electromagnéticas PEMF y el sistema patentado DISSO3, con soporte directo de fábrica desde Puebla, México.",
  metadataBase: new URL("https://hdrivic.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}

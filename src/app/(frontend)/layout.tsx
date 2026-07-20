import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Footer } from "@/shared/components/layout/footer";
import { Navbar } from "@/shared/components/layout/navbar";
import { Providers } from "@/shared/components/providers";
import metadataConfig from "@/shared/config/metadata";

export const metadata: Metadata = metadataConfig;

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

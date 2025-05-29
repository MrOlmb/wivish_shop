import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowFont = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "700"],
});

// Metadata
export const metadata: Metadata = {
  title: "Wivish Shop",
  description: "Your one and only B2B shop to source products from China.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlowFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

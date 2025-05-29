import type { Metadata } from "next";
import "./globals.css";
import {interFont, barlowFont } from "./fonts"


// Metadata
export const metadata: Metadata = {
  title: "Wivish Shop",
  description: "Your one and only shop to source the best products from China.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interFont.variable} ${barlowFont.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}

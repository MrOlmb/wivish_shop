import type { Metadata } from "next";
import {interFont, barlowFont } from "./fonts"

//global styles imports
import "./globals.css";


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
    <html lang="en">
      <body className={`${interFont.variable} ${barlowFont.variable}`}>
        {children}
      </body>
    </html>
  );
}

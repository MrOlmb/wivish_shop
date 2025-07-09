import type { Metadata } from "next";
import { interFont, barlowFont } from "./fonts"

//Clerk authentication api's
import {ClerkProvider} from '@clerk/nextjs'
//Toast provider
import {Toaster} from "@/components/ui/toaster";
import {Toaster as SonnerToaster} from "@/components/ui/sonner"

//global styles imports
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ModalProvider from "@/providers/modal-provider";


// Metadata
export const metadata: Metadata = {
  title: "Wivish Shop",
  description: "Your one and only shop to source the best products from China.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <body className={`${interFont.variable} ${barlowFont.variable}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ModalProvider>{children}</ModalProvider>
            <Toaster/>
            <SonnerToaster position="bottom-left"/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

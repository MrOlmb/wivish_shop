import type { Metadata } from "next";
import { interFont, barlowFont } from "./fonts"

//Clerk authentication api's
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

//global styles imports
import "./globals.css";
import { ThemeProvider } from "next-themes";


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
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <body className={`${interFont.variable} ${barlowFont.variable}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// Next.js
import type { Metadata } from "next";
import { Inter, Barlow } from "next/font/google";

// Global css
import "./globals.css";

// Theme provider
import { ThemeProvider } from "next-themes";

// Clerk provider
import { ClerkProvider } from "@clerk/nextjs";

// Toast
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/modal-provider";

// Fonts
const interFont = Inter({ subsets: ["latin"] });
const barlowFont = Barlow({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-barlow",
});

// Metadata
export const metadata: Metadata = {
  title: "Wivish Store",
  description:
    "Bienvenue sur Wivish Store, votre destination ultime pour un shopping en ligne sans effort ! Découvrez une vaste sélection de produits proposés par nos experts de confiance, réunis en un seul marché pratique. Avec Wivish Store, faire ses achats depuis la Chine devient simple, rapide et agréable. Trouvez tout ce dont vous avez besoin, de la mode et de l'électronique aux essentiels pour la maison, et profitez de la joie d'un shopping en ligne sans tracas. Commencez à explorer dès aujourd'hui !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${interFont.className} ${barlowFont.variable}`}>
          <ModalProvider>{children}</ModalProvider>
          <Toaster />
          <SonnerToaster position="bottom-left" />
        </body>
      </html>
    </ClerkProvider>
  );
}

// Fonts for the application UI
import { Inter, Barlow } from "next/font/google";

export const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
  });
  
export const barlowFont = Barlow({
    variable: "--font-barlow",
    subsets: ["latin"],
    weight: ["500", "700"],
  });
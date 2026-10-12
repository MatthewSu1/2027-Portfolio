import type { Metadata } from "next";
import { cormorantGaramond, inter } from "@/fonts";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "SUMATTHEW",
  description: "Design portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, cormorantGaramond.variable, "font-sans", geist.variable)}
    >
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}

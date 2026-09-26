import type { Metadata } from "next";
import { Italiana, Newsreader, Tenor_Sans, Libre_Franklin } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Free stand-ins for the PoB Hotels type system (Coast / Canela / Haboro Contrast /
// Franklin Gothic URW). globals.css lists the licensed names first, so they take over
// automatically if they are ever licensed and loaded.

// Coast → Italiana: thin display capitals for big headlines
const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

// Canela → Newsreader: editorial serif for card headings and italics
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Haboro Contrast → Tenor Sans: navigation, labels and buttons
const tenorSans = Tenor_Sans({
  variable: "--font-tenor",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

// Franklin Gothic URW → Libre Franklin: paragraphs and small text
const libreFranklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Nanak Hotel Collection — Open the Door to Inspiration",
  description:
    "Nanak Hotel Collection is a small UK collection of country-house hotels in Warwickshire and Worcestershire: Kings Court Hotel and the Evesham Hotel.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} ${newsreader.variable} ${tenorSans.variable} ${libreFranklin.variable} noir`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}

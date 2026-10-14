import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freshfoldlaundry.com"),
  title: {
    default: "FreshFold Laundry | Laundry, made lighter",
    template: "%s | FreshFold Laundry",
  },
  description:
    "Laundry day, taken care of. Thoughtful wash & fold, dry cleaning, and convenient pickup and delivery from FreshFold Laundry.",
  openGraph: {
    title: "FreshFold Laundry",
    description: "Laundry, made lighter. Fresh clothes, right on time.",
    type: "website",
    siteName: "FreshFold Laundry",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

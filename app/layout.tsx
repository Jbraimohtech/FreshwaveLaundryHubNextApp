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
  metadataBase: new URL("https://freshwavelaundry.com"),
  title: {
    default: "FreshWave LaundryHub | Laundry, made lighter",
    template: "%s | FreshWave LaundryHub",
  },
  description:
    "Laundry day, taken care of. Thoughtful wash & fold, dry cleaning, and convenient pickup and delivery from FreshWave LaundryHub.",
  openGraph: {
    title: "FreshWave LaundryHub",
    description: "Laundry, made lighter. Fresh clothes, right on time.",
    type: "website",
    siteName: "FreshWave LaundryHub",
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

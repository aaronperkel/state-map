import type { Metadata, Viewport } from "next";
import { Overpass } from "next/font/google";
import "./globals.css";

const overpass = Overpass({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-overpass",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aaron & Riley: States we've been to",
  description: "One shared map of the states Aaron and Riley have been to.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#121417",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={overpass.variable}>
      <body>{children}</body>
    </html>
  );
}

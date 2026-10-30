import type { Metadata, Viewport } from "next";
import { nunito } from "./fonts";
import { PALETTE, cssVars } from "@/lib/palette";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aaron & Riley: States we've been to",
  description: "One shared map of the states Aaron and Riley have been to.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: PALETTE.bg,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable} style={cssVars() as React.CSSProperties}>
      <body>{children}</body>
    </html>
  );
}

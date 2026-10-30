import type { Metadata, Viewport } from "next";
import { nunito } from "./fonts";
import { PALETTE, cssVars } from "@/lib/palette";
import "./globals.css";

const DESCRIPTION = "One shared map of the states Aaron and Riley have been to.";

// Absolute URLs for the social images. Vercel sets the production host; locally
// fall back to the dev server.
const SITE = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Aaron & Riley: States we've been to",
  description: DESCRIPTION,
  applicationName: "Aaron & Riley",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "States", statusBarStyle: "default" },
  openGraph: {
    type: "website",
    siteName: "Aaron & Riley",
    title: "Aaron & Riley",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron & Riley",
    description: DESCRIPTION,
  },
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

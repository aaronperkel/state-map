import type { MetadataRoute } from "next";
import { PALETTE } from "@/lib/palette";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aaron & Riley",
    short_name: "States",
    description: "One shared map of the states Aaron and Riley have been to.",
    start_url: "/",
    display: "standalone",
    background_color: PALETTE.bg,
    theme_color: PALETTE.bg,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

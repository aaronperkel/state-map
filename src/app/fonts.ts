import { Nunito } from "next/font/google";

/**
 * Nunito is a variable Google font (wght 200–1000), so no `weight` list: one
 * @font-face covers every weight. Shared by the layout and the share-card
 * renderer so both use the same hashed family name.
 */
export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

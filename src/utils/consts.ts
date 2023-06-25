import localFont from "@next/font/local";

export const virgil = localFont({
  src: [
    {
      path: "../../public/fonts/Virgil.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/Virgil.woff2",
      weight: "700",
    },
  ],
  variable: "--font-virgil",
});

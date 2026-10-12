import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "./Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const cormorantGaramond = localFont({
  src: [
    {
      path: "./CormorantGaramond-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./CormorantGaramond-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./CormorantGaramond-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

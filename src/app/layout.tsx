import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const circularStd = localFont({
  variable: "--font-circularStd",
  src: [
    {
      path: "./font/CircularStd-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font/CircularStd-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "./font/CircularStd-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./font/CircularStd-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "./font/CircularStd-Book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/CircularStd-BookItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./font/CircularStd-Black.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "./font/CircularStd-BlackItalic.woff",
      weight: "900",
      style: "italic",
    },
  ],
});

const abrilFatface = localFont({
  variable: "--font-abrilFatface",
  src: [
    {
      path: "./font/AbrilFatface-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "The Idea Bank",
  description: "Share Creative Ideas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${circularStd.variable} ${abrilFatface.variable} font-circularStd text-tib-black`}>{children}</body>
    </html>
  );
}

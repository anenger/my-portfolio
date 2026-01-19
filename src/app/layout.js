import "./global.css";

import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Unbounded } from "next/font/google";

import Providers from "./providers";
import { siteMetadata } from "./siteMetadata";

const unbounded = Unbounded({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
  variable: "--font-unbounded",
});

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl),
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    images: [siteMetadata.image],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
    creator: siteMetadata.twitterUsername,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={unbounded.variable}>
      <body>
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId="G-9Y7BMCXF75" />
      </body>
    </html>
  );
}

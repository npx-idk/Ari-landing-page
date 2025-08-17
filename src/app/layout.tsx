import type { Metadata } from "next";
import { Benne, Hanken_Grotesk } from "next/font/google";
import "@ari/ui/globals.css";

const benne = Benne({
  weight: "400",
  variable: "--font-benne",
  subsets: ["latin"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shopkeeper - Build Amazing Experiences Faster",
  description:
    "The modern platform that helps teams ship beautiful products with confidence. Built for developers, designed for everyone.",
  keywords: [
    "development platform",
    "team collaboration",
    "developer tools",
    "product development",
  ],
  authors: [{ name: "Shopkeeper Team" }],
  creator: "Shopkeeper",
  openGraph: {
    title: "Shopkeeper - Build Amazing Experiences Faster",
    description:
      "The modern platform that helps teams ship beautiful products with confidence.",
    url: "https://shopkeeper.com",
    siteName: "Shopkeeper",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopkeeper - Build Amazing Experiences Faster",
    description:
      "The modern platform that helps teams ship beautiful products with confidence.",
    creator: "@ari",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${hankenGrotesk.variable} ${benne.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

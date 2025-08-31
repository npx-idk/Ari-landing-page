import type { Metadata } from "next";
import { Benne, Hanken_Grotesk } from "next/font/google";
import "@ari/ui/globals.css";
import OrganizationStructuredData from "@/components/OrganizationStructuredData";

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
  title: "AI Chatbot for E-commerce | 24/7 Customer Support & Sales Assistant",
  description:
    "Deploy intelligent AI chatbots for your e-commerce store. Automate customer support, boost sales with voice calls, image search, and multilingual chat. Increase conversions 24/7.",
  keywords: [
    "AI chatbot",
    "e-commerce chatbot",
    "customer service automation",
    "AI sales assistant",
    "voice chatbot",
    "multilingual chatbot",
    "Shopify AI assistant",
    "e-commerce automation",
    "customer support bot",
    "AI customer service",
    "conversational AI",
    "chatbot for online stores",
    "AI-powered customer engagement",
    "automated sales assistant",
    "intelligent chatbot platform",
    "e-commerce AI tools",
    "customer experience automation",
    "AI voice assistant",
    "image recognition chatbot",
    "24/7 customer support",
  ],
  authors: [{ name: "Ari AI Team" }],
  creator: "Ari AI",
  publisher: "Ari AI",
  openGraph: {
    title:
      "AI Chatbot for E-commerce | 24/7 Customer Support & Sales Assistant",
    description:
      "Deploy intelligent AI chatbots for your e-commerce store. Automate customer support, boost sales with voice calls, image search, and multilingual chat.",
    url: "https://ari-ai.com",
    siteName: "Ari AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Chatbot for E-commerce - Ari AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Chatbot for E-commerce | 24/7 Customer Support & Sales Assistant",
    description:
      "Deploy intelligent AI chatbots for your e-commerce store. Automate customer support, boost sales with voice calls, image search, and multilingual chat.",
    creator: "@ari_ai",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://ari-ai.com",
    languages: {
      "en-US": "https://ari-ai.com",
      "es-ES": "https://ari-ai.com/es",
      "fr-FR": "https://ari-ai.com/fr",
    },
  },
  category: "Technology",
  classification: "AI Chatbot Software",
};

export default function RootLayout({
  children,
  blog,
}: Readonly<{
  children: React.ReactNode;
  blog: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth dark"
      style={{ colorScheme: "dark" }}
    >
      <head>
        <link rel="canonical" href="https://ari-ai.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10B981" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#10B981" />
      </head>
      <body
        className={`${hankenGrotesk.variable} ${benne.variable} font-body antialiased`}
      >
        <OrganizationStructuredData />
        {children}
      </body>
    </html>
  );
}

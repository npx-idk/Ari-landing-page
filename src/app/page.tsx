"use client";

import Faq from "@/custom/faq";
import Features from "@/custom/features";
import Footer from "@/custom/footer";
import { Header } from "@/custom/header";
import HeroSection from "@/custom/hero";
import { LogoCloud } from "@/custom/logo-cloud";
import Pricing from "@/custom/pricing";
import TabView from "@/custom/tab-view";
import Testimonials from "@/custom/testimonials";
import { useEffect } from "react";

// WebSite and Product Structured Data for Homepage
const HomePageStructuredData = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ari AI - AI Chatbot for E-commerce",
    url: "https://ari-ai.com",
    description:
      "Deploy intelligent AI chatbots for your e-commerce store. Automate customer support, boost sales with voice calls, image search, and multilingual chat.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ari-ai.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Ari AI",
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ari AI Chatbot",
    description:
      "Advanced AI chatbot platform for e-commerce automation with voice calls, image recognition, and 24/7 multilingual customer support",
    url: "https://ari-ai.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "29",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://ari-ai.com/pricing",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1247",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "Ari AI",
    },
    keywords:
      "AI chatbot, e-commerce automation, customer service bot, voice assistant, multilingual chat",
    softwareVersion: "2.0",
    datePublished: "2024-01-01",
    dateModified: "2024-12-01",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ari-ai.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Chatbot",
        item: "https://ari-ai.com#chatbot",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Features",
        item: "https://ari-ai.com#features",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an AI chatbot for e-commerce?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An AI chatbot for e-commerce is an intelligent virtual assistant that automates customer interactions, handles support queries, processes orders, and provides 24/7 customer service using artificial intelligence and natural language processing.",
        },
      },
      {
        "@type": "Question",
        name: "How can AI chatbots increase e-commerce sales?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI chatbots increase e-commerce sales by providing instant product recommendations, answering customer questions immediately, reducing cart abandonment, offering personalized shopping experiences, and being available 24/7 to assist customers.",
        },
      },
      {
        "@type": "Question",
        name: "Does the AI chatbot support multiple languages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our AI chatbot supports over 100 languages and can automatically detect customer language preferences to provide seamless multilingual customer support.",
        },
      },
      {
        "@type": "Question",
        name: "Can the AI chatbot handle voice calls?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! Our AI chatbot includes advanced voice call capabilities, allowing customers to speak naturally with the AI assistant for product inquiries, order tracking, and customer support.",
        },
      },
    ],
  };

  useEffect(() => {
    // Add structured data to page
    const addStructuredData = (schema: any, id: string) => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();

      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    addStructuredData(websiteSchema, "website-schema");
    addStructuredData(productSchema, "product-schema");
    addStructuredData(breadcrumbSchema, "breadcrumb-schema");
    addStructuredData(faqSchema, "faq-schema");

    // Add additional meta tags for better SEO
    const addMetaTag = (name: string, content: string) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (existing) existing.remove();

      const meta = document.createElement("meta");
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    };

    // Additional SEO meta tags
    addMetaTag(
      "robots",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    addMetaTag(
      "googlebot",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    addMetaTag(
      "bingbot",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    // Semantic keywords for AI chatbot ranking
    addMetaTag(
      "keywords-primary",
      "AI chatbot, e-commerce chatbot, customer service automation"
    );
    addMetaTag(
      "keywords-secondary",
      "voice chatbot, multilingual chat, sales assistant AI"
    );
    addMetaTag(
      "keywords-longtail",
      "AI chatbot for Shopify stores, automated customer support, intelligent shopping assistant"
    );

    // Geographic targeting
    addMetaTag("geo.region", "US");
    addMetaTag("geo.country", "US");
    addMetaTag("language", "en");
    addMetaTag("distribution", "global");

    // Content classification
    addMetaTag("rating", "general");
    addMetaTag("content-language", "en");
    addMetaTag("audience", "business owners, e-commerce managers, developers");

    return () => {
      // Cleanup function
      document.getElementById("website-schema")?.remove();
      document.getElementById("product-schema")?.remove();
      document.getElementById("breadcrumb-schema")?.remove();
      document.getElementById("faq-schema")?.remove();
    };
  }, []);

  return null;
};

// SEO Content Component for hidden semantic content
const SEOContent = () => (
  <div className="sr-only">
    <h1>
      AI Chatbot for E-commerce Stores - Automate Customer Support & Boost Sales
    </h1>
    <p>
      Transform your e-commerce business with our intelligent AI chatbot
      platform. Provide 24/7 customer support, automate sales processes, and
      engage customers with voice calls, image recognition, and multilingual
      chat capabilities.
    </p>
    <h2>Best AI Chatbot Features for E-commerce</h2>
    <ul>
      <li>Automated customer service and support ticket resolution</li>
      <li>AI-powered product recommendations and upselling</li>
      <li>Voice call integration for premium customer experience</li>
      <li>Image search and visual product discovery</li>
      <li>Multilingual support for global e-commerce expansion</li>
      <li>Shopify, WooCommerce, and Magento integrations</li>
      <li>Real-time order tracking and customer notifications</li>
      <li>Intelligent lead qualification and conversion optimization</li>
    </ul>
    <h3>Why Choose Our AI Chatbot Platform?</h3>
    <p>
      Our AI chatbot solution is specifically designed for e-commerce businesses
      looking to scale customer support, increase sales conversions, and provide
      exceptional customer experiences. With advanced natural language
      processing and machine learning capabilities, our chatbot understands
      customer intent and delivers personalized responses that drive results.
    </p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomePageStructuredData />
      <SEOContent />
      <Header />
      <main>
        <HeroSection />
        <Features />
        <TabView />
        <LogoCloud />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { useEffect } from "react";

interface BlogPostStructuredDataProps {
  post: any;
}

export default function BlogPostStructuredData({
  post,
}: BlogPostStructuredDataProps) {
  useEffect(() => {
    const imageUrl = post.featuredImage?.fields.file.url
      ? `https:${post.featuredImage.fields.file.url}?fm=webp&q=80&w=1200`
      : undefined;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description:
        post.shortDescription ||
        `Read about ${post.title} - AI-powered e-commerce insights and strategies.`,
      image: imageUrl ? [imageUrl] : [],
      datePublished: post.publishedDate,
      dateModified: post.publishedDate,
      author: {
        "@type": "Person",
        name: post.writer?.[0] || "AI E-commerce Team",
      },
      publisher: {
        "@type": "Organization",
        name: "AI E-commerce Insights",
        logo: {
          "@type": "ImageObject",
          url: "https://yoursite.com/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://yoursite.com/blog/${post.slug}`,
      },
      keywords:
        post.tags?.join(", ") ||
        "AI, e-commerce, automation, chatbot, customer engagement",
      articleSection: "AI E-commerce",
      wordCount: "1000", // You could calculate this from content
    };

    // Remove existing schema
    document.getElementById("blog-post-schema")?.remove();

    // Add structured data
    const script = document.createElement("script");
    script.id = "blog-post-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.getElementById("blog-post-schema")?.remove();
    };
  }, [post]);

  return null;
}

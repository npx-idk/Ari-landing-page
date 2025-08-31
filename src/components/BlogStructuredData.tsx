"use client";

import { useEffect } from "react";

interface BlogStructuredDataProps {
  posts: any[];
  total: number;
  page: number;
}

export default function BlogStructuredData({
  posts,
  total,
  page,
}: BlogStructuredDataProps) {
  useEffect(() => {
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "AI Chatbot Blog - E-commerce Automation Insights",
      description:
        "Expert insights on AI chatbots, e-commerce automation, customer service optimization, and sales enhancement strategies",
      url: "https://ari-ai.com/blog",
      publisher: {
        "@type": "Organization",
        name: "Ari AI",
      },
      blogPost: posts.slice(0, 10).map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.shortDescription || `Read about ${post.title}`,
        url: `https://ari-ai.com/blog/${post.slug}`,
        datePublished: post.publishedDate,
        author: {
          "@type": "Person",
          name: post.writer?.[0] || "Ari AI Team",
        },
        publisher: {
          "@type": "Organization",
          name: "Ari AI",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://ari-ai.com/blog/${post.slug}`,
        },
      })),
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
          name: "Blog",
          item: "https://ari-ai.com/blog",
        },
      ],
    };

    // Remove existing schemas
    document.getElementById("blog-schema")?.remove();
    document.getElementById("blog-breadcrumb-schema")?.remove();

    // Add blog schema
    const blogScript = document.createElement("script");
    blogScript.id = "blog-schema";
    blogScript.type = "application/ld+json";
    blogScript.text = JSON.stringify(blogSchema);
    document.head.appendChild(blogScript);

    // Add breadcrumb schema
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.id = "blog-breadcrumb-schema";
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.getElementById("blog-schema")?.remove();
      document.getElementById("blog-breadcrumb-schema")?.remove();
    };
  }, [posts, total, page]);

  return null;
}

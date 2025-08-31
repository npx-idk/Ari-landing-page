"use client";

import { useEffect } from "react";

export default function OrganizationStructuredData() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Ari AI",
      alternateName: "Ari Artificial Intelligence",
      description:
        "Leading AI chatbot platform for e-commerce automation, customer support, and sales enhancement",
      url: "https://ari-ai.com",
      logo: "https://ari-ai.com/logo.png",
      foundingDate: "2024",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-800-ARI-AI",
        contactType: "customer service",
        availableLanguage: ["English", "Spanish", "French", "German"],
      },
      sameAs: [
        "https://twitter.com/ari_ai",
        "https://linkedin.com/company/ari-ai",
        "https://github.com/ari-ai",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
    };

    // Remove any existing organization schema
    const existing = document.getElementById("organization-schema");
    if (existing) existing.remove();

    // Add the organization structured data
    const script = document.createElement("script");
    script.id = "organization-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      document.getElementById("organization-schema")?.remove();
    };
  }, []);

  return null;
}

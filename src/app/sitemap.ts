import { MetadataRoute } from "next";
import { fetchBlogPosts } from "@/lib/contentful";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ari-ai.com";

  // Fetch all blog posts for dynamic URLs
  const blogPosts = await fetchBlogPosts(1000); // Get all posts

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Dynamic blog post pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Combine all pages
  return [...staticPages, ...blogPages];
}

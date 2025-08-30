import * as contentful from "contentful";

export type BlogPost = {
  sys: { id: string };
  internalName: string;
  slug: string;
  publishedDate: string;
  title: string;
  shortDescription?: string;
  featuredImage?: {
    fields: {
      file: { url: string; details?: { image?: { width: number; height: number } } };
      title?: string;
    };
  };
  content: unknown;
  metadata?: {
    tags?: Array<{ sys: { id: string } }>;
  };
};

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN as string;
const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN as string | undefined;
const usePreview = (process.env.NEXT_PUBLIC_CONTENTFUL_USE_PREVIEW as string | undefined) === "true";

export const client = contentful.createClient({
  space,
  accessToken: usePreview && previewToken ? previewToken : accessToken,
  host: usePreview ? "preview.contentful.com" : "cdn.contentful.com",
});

export async function fetchBlogPosts(limit = 20): Promise<BlogPost[]> {
  const res = await client.getEntries({
    content_type: "pageBlogPost",
    order: ["-fields.publishedDate"],
    limit,
  });
  const items = res.items as Array<{ sys: { id: string }; fields: any; metadata?: any }>;
  return items.map((item) => ({ sys: item.sys, metadata: item.metadata, ...item.fields })) as unknown as BlogPost[];
}

export async function fetchBlogPostsPage({
  limit = 6,
  page = 1,
}: {
  limit?: number;
  page?: number;
}): Promise<{ posts: BlogPost[]; total: number }> {
  const skip = Math.max(0, (page - 1) * limit);
  const res = await client.getEntries({
    content_type: "pageBlogPost",
    order: ["-fields.publishedDate"],
    limit,
    skip,
  });
  const items = res.items as Array<{ sys: { id: string }; fields: any; metadata?: any }>;
  const posts = items.map((item) => ({ sys: item.sys, metadata: item.metadata, ...item.fields })) as unknown as BlogPost[];
  // @ts-expect-error contentful types
  const total: number = res.total as number;
  return { posts, total };
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await client.getEntries({
    content_type: "pageBlogPost",
    "fields.slug": slug,
    limit: 1,
  });
  const item = res.items[0] as unknown as { sys: { id: string }; fields: any; metadata?: any } | undefined;
  if (!item) return null;
  return ({ sys: item.sys, metadata: item.metadata, ...item.fields } as unknown) as BlogPost;
}



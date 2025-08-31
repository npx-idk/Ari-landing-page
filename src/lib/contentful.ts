import * as contentful from "contentful";

export type BlogPost = {
  sys: { id: string };
  internalName?: string; // keeping for backwards compatibility
  slug: string;
  publishedDate: string; // mapped from 'date' field
  title: string; // mapped from 'header' field
  shortDescription?: string; // keeping for backwards compatibility
  featuredImage?: {
    fields: {
      file: {
        url: string;
        details?: { image?: { width: number; height: number } };
      };
      title?: string;
    };
  }; // mapped from 'featureImage' field
  content: unknown;
  tags?: string[]; // mapped from 'tags' field
  writer?: string[]; // mapped from 'writer' field
  metadata?: {
    tags?: Array<{ sys: { id: string } }>;
  };
};

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN as string;
const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN as
  | string
  | undefined;
const usePreview =
  (process.env.NEXT_PUBLIC_CONTENTFUL_USE_PREVIEW as string | undefined) ===
  "true";

export const client = contentful.createClient({
  space,
  accessToken: usePreview && previewToken ? previewToken : accessToken,
  host: usePreview ? "preview.contentful.com" : "cdn.contentful.com",
});

function mapBlogPost(item: {
  sys: { id: string };
  fields: any;
  metadata?: any;
}): BlogPost {
  return {
    sys: item.sys,
    metadata: item.metadata,
    // Map new fields to old field names for compatibility
    internalName: item.fields.header || "", // Use header as internal name
    slug: item.fields.slug || "",
    publishedDate: item.fields.date || new Date().toISOString(), // Map 'date' to 'publishedDate'
    title: item.fields.header || "Untitled", // Map 'header' to 'title'
    shortDescription: "", // No direct mapping, keeping empty for now
    featuredImage: item.fields.featureImage, // Map 'featureImage' to 'featuredImage'
    content: item.fields.content,
    tags: item.fields.tags,
    writer: item.fields.writer,
  } as BlogPost;
}

export async function fetchBlogPosts(limit = 20): Promise<BlogPost[]> {
  const res = await client.getEntries({
    content_type: "blogPage",
    order: ["-fields.date"],
    limit,
  });
  const items = res.items as Array<{
    sys: { id: string };
    fields: any;
    metadata?: any;
  }>;
  return items.map(mapBlogPost);
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
    content_type: "blogPage",
    order: ["-fields.date"],
    limit,
    skip,
  });
  const items = res.items as Array<{
    sys: { id: string };
    fields: any;
    metadata?: any;
  }>;
  const posts = items.map(mapBlogPost);
  const total: number = res.total as number;
  return { posts, total };
}

export async function fetchBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const res = await client.getEntries({
    content_type: "blogPage",
    "fields.slug": slug,
    limit: 1,
  });
  const item = res.items[0] as unknown as
    | { sys: { id: string }; fields: any; metadata?: any }
    | undefined;
  if (!item) return null;
  return mapBlogPost(item);
}

"use client";

import Link from "next/link";
import { format } from "date-fns";
import type { BlogPost } from "@/lib/contentful";

type Props = {
  post: BlogPost;
};

export default function PostCard({ post }: Props) {
  const imageUrl = post.featuredImage?.fields.file.url
    ? `https:${post.featuredImage.fields.file.url}?fm=webp&q=80&w=1200`
    : undefined;

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/5 transition hover:-translate-y-1">
      {imageUrl && (
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={post.featuredImage?.fields.title || post.title}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
      )}
      <div className="p-6">
        <div className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-neutral-700">Article</span>
          {post.publishedDate ? format(new Date(post.publishedDate), "PPP") : null}
        </div>
        <h3 className="text-xl font-semibold tracking-tight">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand-600">
            {post.title}
          </Link>
        </h3>
        {post.shortDescription && (
          <p className="mt-2 line-clamp-3 text-neutral-600">{post.shortDescription}</p>
        )}
        <div className="mt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-brand-700"
          >
            Read more
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}



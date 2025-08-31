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
    <article className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-card dark:shadow-gray-900/20 ring-1 ring-black/5 dark:ring-gray-700/30 transition hover:-translate-y-1">
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
        <div className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          <span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-neutral-700 dark:text-neutral-300">
            Article
          </span>
          {post.publishedDate
            ? format(new Date(post.publishedDate), "PPP")
            : null}
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-primary dark:hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>
        {post.shortDescription && (
          <p className="mt-2 line-clamp-3 text-neutral-600 dark:text-neutral-400">
            {post.shortDescription}
          </p>
        )}
        <div className="mt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 px-4 py-2 text-sm font-medium text-white shadow transition-colors"
          >
            Read more
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

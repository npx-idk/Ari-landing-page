"use client";

import Link from "next/link";
import { format } from "date-fns";
import type { BlogPost } from "@/lib/contentful";

type Props = {
  post: BlogPost;
  label: string;
};

export default function HeroPost({ post, label }: Props) {
  const imageUrl = post.featuredImage?.fields.file.url
    ? `https:${post.featuredImage.fields.file.url}?fm=webp&q=80&w=2000`
    : undefined;

  return (
    <section className="relative mb-10 overflow-hidden rounded-3xl">
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={post.featuredImage?.fields.title || post.title}
          className="h-[420px] w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-6xl items-end px-6 pb-10 lg:px-8">
          <div className="max-w-3xl text-white">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              <span>{label}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            {post.shortDescription && (
              <p className="mt-3 line-clamp-3 text-white/90">{post.shortDescription}</p>
            )}
            <div className="mt-4 text-sm text-white/80">
              {post.publishedDate ? format(new Date(post.publishedDate), "PPP") : null}
            </div>
            <div className="mt-6">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-100"
              >
                Read article <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



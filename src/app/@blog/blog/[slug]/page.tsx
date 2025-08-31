import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { fetchBlogPostBySlug } from "@/lib/contentful";
import { format } from "date-fns";
import Footer from "@/custom/footer";
import { Header } from "@/custom/header";
import { AnimatedGroup } from "@/custom/motion/animated-group";
import { TextEffect } from "@/custom/motion/text-effect";
import {
  MovingBorderWrapper,
  GRADIENT_PRESETS,
} from "@/custom/motion/moving-border-wrapper";
import Image from "next/image";
import { Metadata } from "next";

export const revalidate = 300;
export const runtime = "nodejs";

// JSON-LD Structured Data Component for SEO
const StructuredData = ({ post }: { post: any }) => {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

type Params = { params: { slug: string } };

// Generate metadata for SEO
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  const imageUrl = post.featuredImage?.fields.file.url
    ? `https:${post.featuredImage.fields.file.url}?fm=webp&q=80&w=1200`
    : undefined;

  const description =
    post.shortDescription ||
    `Discover ${post.title} - Expert insights on AI chatbots, e-commerce automation, customer service optimization, and sales enhancement strategies for online businesses.`;

  const keywords = [
    ...(post.tags || []),
    "AI chatbot",
    "e-commerce automation",
    "customer service AI",
    "sales automation",
    "chatbot implementation",
    "e-commerce optimization",
    "customer engagement AI",
    "automated customer support",
    "AI sales assistant",
    "e-commerce growth strategies",
  ].join(", ");

  return {
    title: `${post.title} | AI Chatbot & E-commerce Automation Blog`,
    description,
    keywords,
    authors: [{ name: post.writer?.[0] || "Ari AI Team" }],
    creator: "Ari AI",
    publisher: "Ari AI",
    openGraph: {
      title: post.title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: `${post.title} - AI Chatbot Blog`,
              type: "image/webp",
            },
          ]
        : [],
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.publishedDate,
      authors: post.writer || ["Ari AI Team"],
      section: "AI E-commerce",
      tags: post.tags || ["AI chatbot", "e-commerce", "automation"],
      url: `https://ari-ai.com/blog/${post.slug}`,
      siteName: "Ari AI",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: "@ari_ai",
      creator: "@ari_ai",
      title: post.title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: `${post.title} - AI Chatbot Blog`,
            },
          ]
        : [],
    },
    alternates: {
      canonical: `https://ari-ai.com/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "Technology",
    classification: "AI Chatbot Article",
  };
}

// Background Aura Component
const BackgroundAura = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <div
      className="absolute top-1/4 left-1/2 w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] max-w-[400px] max-h-[400px]
                 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] sm:blur-[120px]
                 bg-[oklch(0.35_0.03_250)] opacity-2 sm:opacity-3 dark:hidden"
    />

    <div
      className="absolute top-1/4 left-1/2 w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] max-w-[400px] max-h-[400px] 
                 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] sm:blur-[120px] 
                 bg-[oklch(0.8254_0.2367_148.368)] opacity-[0.02] sm:opacity-[0.03] hidden dark:block"
    />
  </div>
);

// Back to Blog Button Component
const BackToBlogButton = () => (
  <AnimatedGroup preset="slide" viewportBehavior="once">
    <Link
      href="/blog"
      className="group inline-flex items-center gap-2 rounded-full bg-white dark:bg-gray-800 
                 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
                 shadow-lg hover:shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 
                 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/5 
                 dark:hover:bg-primary/10 hover:ring-primary/30"
    >
      <svg
        className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back to Blog
    </Link>
  </AnimatedGroup>
);

// Article Metadata Component
const ArticleMetadata = ({ post }: { post: any }) => (
  <AnimatedGroup preset="blur-slide" viewportBehavior="once">
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
      {/* Author */}
      {post.writer && post.writer.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {post.writer[0].charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {post.writer[0]}
          </span>
        </div>
      )}

      {/* Date */}
      {post.publishedDate && (
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <time dateTime={post.publishedDate} className="font-medium">
            {format(new Date(post.publishedDate), "MMMM d, yyyy")}
          </time>
        </div>
      )}

      {/* Reading Time Estimate */}
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>5 min read</span>
      </div>
    </div>

    {/* Tags */}
    {post.tags && post.tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags.slice(0, 4).map((tag: string, index: number) => (
          <span
            key={index}
            className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 
                       px-3 py-1 text-xs font-medium text-primary dark:text-primary/90"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </AnimatedGroup>
);

export default async function BlogPostPage({ params }: Params) {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) return notFound();

  const imageUrl = post.featuredImage?.fields.file.url
    ? `https:${post.featuredImage.fields.file.url}?fm=webp&q=80&w=1600`
    : undefined;

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const url = node?.data?.target?.fields?.file?.url;
        const title = node?.data?.target?.fields?.title ?? "";
        if (!url) return null;
        return (
          <div className="my-8">
            <img
              src={`https:${url}`}
              alt={title}
              className="w-full rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            {title && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
                {title}
              </p>
            )}
          </div>
        );
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        const href = node?.data?.uri as string;
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary hover:text-primary/80 underline underline-offset-2 
                       decoration-primary/30 hover:decoration-primary/60 transition-colors duration-200"
          >
            {children}
          </a>
        );
      },
      [BLOCKS.HEADING_1]: (node: any, children: any) => (
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 first:mt-0">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">
          {children}
        </h3>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
          {children}
        </p>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6 ml-4">
          {children}
        </ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6 ml-4">
          {children}
        </ol>
      ),
      [BLOCKS.QUOTE]: (node: any, children: any) => (
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 bg-primary/5 dark:bg-primary/10 rounded-r-lg">
          <div className="text-gray-700 dark:text-gray-300 italic text-lg">
            {children}
          </div>
        </blockquote>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <StructuredData post={post} />
      <Header />
      <main>
        <article>
          {/* Hero Section */}
          <header className="relative isolate overflow-hidden">
            <BackgroundAura />
            <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
              <BackToBlogButton />

              <div className="mt-8">
                <AnimatedGroup preset="blur-slide" viewportBehavior="once">
                  <TextEffect
                    preset="fade-in-blur"
                    per="word"
                    as="h1"
                    className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white 
                               sm:text-5xl lg:text-6xl leading-tight"
                    viewportBehavior="once"
                  >
                    {post.title}
                  </TextEffect>
                </AnimatedGroup>

                <div className="mt-8">
                  <ArticleMetadata post={post} />
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <section className="mx-auto max-w-6xl px-6 pb-12 lg:px-8">
              <AnimatedGroup preset="scale" viewportBehavior="once">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={imageUrl}
                    alt={post.featuredImage?.fields.title || post.title}
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </AnimatedGroup>
            </section>
          )}

          {/* Article Content */}
          <section className="mx-auto max-w-3xl px-6 pb-24 lg:px-8">
            <AnimatedGroup preset="blur-slide" viewportBehavior="once">
              <div
                className="prose prose-lg max-w-none prose-gray dark:prose-invert
                              prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white
                              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                              prose-strong:text-gray-900 dark:prose-strong:text-white
                              prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded
                              prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:border
                              prose-blockquote:border-primary prose-blockquote:bg-primary/5 dark:prose-blockquote:bg-primary/10
                              prose-img:rounded-xl prose-img:shadow-lg"
              >
                {documentToReactComponents(
                  post.content as unknown as Document,
                  options
                )}
              </div>
            </AnimatedGroup>

            {/* Article Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <AnimatedGroup preset="fade" viewportBehavior="once">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  {/* Author Info */}
                  {post.writer && post.writer.length > 0 && (
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 
                                      flex items-center justify-center shadow-lg"
                      >
                        <span className="text-white text-lg font-semibold">
                          {post.writer[0].charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {post.writer[0]}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Content Writer
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Back to Blog */}
                  <BackToBlogButton />
                </div>
              </AnimatedGroup>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

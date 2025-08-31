import { fetchBlogPostsPage } from "@/lib/contentful";
import HeroPost from "../_components/HeroPost";
import PostCard from "../_components/PostCard";
import Footer from "@/custom/footer";
import { Header } from "@/custom/header";
import { AnimatedGroup } from "@/custom/motion/animated-group";
import { TextEffect } from "@/custom/motion/text-effect";
import {
  MovingBorderWrapper,
  GRADIENT_PRESETS,
} from "@/custom/motion/moving-border-wrapper";
import Image from "next/image";

export const revalidate = 300;
export const runtime = "nodejs";

// Generate metadata for blog listing page
export const metadata = {
  title: "AI Chatbot Blog | E-commerce Automation Tips & Strategies",
  description:
    "Discover the latest insights on AI chatbots, e-commerce automation, customer service optimization, and sales enhancement strategies. Expert tips for growing your online business.",
  keywords:
    "AI chatbot blog, e-commerce automation tips, customer service strategies, AI sales assistant guides, chatbot implementation, e-commerce growth hacks",
  openGraph: {
    title: "AI Chatbot Blog | E-commerce Automation Tips & Strategies",
    description:
      "Discover the latest insights on AI chatbots, e-commerce automation, customer service optimization, and sales enhancement strategies.",
    type: "website",
    url: "https://ari-ai.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chatbot Blog | E-commerce Automation Tips & Strategies",
    description:
      "Discover the latest insights on AI chatbots, e-commerce automation, customer service optimization, and sales enhancement strategies.",
  },
  alternates: {
    canonical: "https://ari-ai.com/blog",
  },
};

// Background Aura Component similar to hero section
const BackgroundAura = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Light Mode Auras */}
    <div
      className="absolute top-1/4 left-1/2 w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] max-w-[600px] max-h-[600px]
                 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] sm:blur-[140px]
                 bg-[oklch(0.35_0.03_250)] opacity-3 sm:opacity-4 dark:hidden"
    />

    <div
      className="absolute top-1/2 left-1/2 w-[50vw] h-[50vw] sm:w-[40vw] sm:h-[40vw] max-w-[400px] max-h-[400px]
                 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] sm:blur-[80px]
                 bg-gradient-to-tl from-black/1 via-black/0.5 to-black/1 dark:hidden"
    />

    {/* Dark Mode Auras */}
    <div
      className="absolute top-1/4 left-1/2 w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] max-w-[600px] max-h-[600px] 
                 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] sm:blur-[140px] 
                 bg-[oklch(0.8254_0.2367_148.368)] opacity-[0.03] sm:opacity-[0.04] hidden dark:block"
    />

    <div
      className="absolute top-1/2 left-1/2 w-[50vw] h-[50vw] sm:w-[40vw] sm:h-[40vw] max-w-[400px] max-h-[400px]
                 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] sm:blur-[80px]
                 bg-gradient-to-tl from-primary/3 via-primary/2 to-primary/3 hidden dark:block"
    />
  </div>
);

// Blog Badge Component similar to hero badge
const BlogBadge = () => (
  <AnimatedGroup preset="blur-slide" viewportBehavior="once">
    <MovingBorderWrapper
      duration={4000}
      borderRadius="9999px"
      gradientColors={GRADIENT_PRESETS.green}
      glowIntensity="medium"
      size="lg"
      borderWidth="1px"
      className="inline-flex drop-shadow dark:drop-shadow-primary/20"
    >
      <div className="flex items-center gap-2 bg-white dark:bg-[#011e2b] rounded-full px-4 py-2">
        <Image
          src="/assets/images/ai-sparkle.svg"
          alt="AI Sparkle"
          width={20}
          height={20}
          className="flex-shrink-0"
          loading="lazy"
        />
        <p className="text-sm dark:text-white/90 text-gray-700 whitespace-nowrap">
          From our blog
        </p>
      </div>
    </MovingBorderWrapper>
  </AnimatedGroup>
);

// Blog Structured Data Component
const BlogStructuredData = ({
  posts,
  total,
  page,
}: {
  posts: any[];
  total: number;
  page: number;
}) => {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const pageParam = Array.isArray(resolvedSearchParams?.page)
    ? resolvedSearchParams?.page[0]
    : resolvedSearchParams?.page;
  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, total } = await fetchBlogPostsPage({ limit: 6, page });
  const totalPages = Math.max(1, Math.ceil(total / 6));
  const featured = posts.find((p) =>
    p.metadata?.tags?.some((t) => t.sys.id.toLowerCase().includes("featured"))
  );
  const recent = posts[0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <BlogStructuredData posts={posts} total={total} page={page} />
      <Header />
      <main>
        <section className="relative isolate overflow-hidden">
          <BackgroundAura />
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <BlogBadge />

              <AnimatedGroup preset="blur-slide" viewportBehavior="once">
                <TextEffect
                  preset="fade-in-blur"
                  per="word"
                  as="h1"
                  className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white/90 sm:text-6xl"
                  viewportBehavior="once"
                >
                  AI-Powered E-commerce Insights
                </TextEffect>

                <TextEffect
                  preset="slide"
                  per="line"
                  delay={0.3}
                  as="p"
                  className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
                  viewportBehavior="once"
                >
                  Deep dives into AI automation, customer engagement strategies,
                  and e-commerce growth — fresh insights for modern online
                  businesses.
                </TextEffect>
              </AnimatedGroup>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
          <AnimatedGroup
            preset="blur-slide"
            viewportBehavior="once"
            className="space-y-10"
          >
            {featured && <HeroPost post={featured} label="Featured" />}
            {recent && (!featured || featured.sys.id !== recent.sys.id) && (
              <HeroPost post={recent} label="Recent" />
            )}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts
                .filter(
                  (p) =>
                    p.sys.id !== featured?.sys.id && p.sys.id !== recent?.sys.id
                )
                .map((post) => (
                  <PostCard key={post.sys.id} post={post} />
                ))}
            </div>
            <div className="flex items-center justify-center gap-4 pt-8">
              <AnimatedGroup
                preset="scale"
                viewportBehavior="once"
                className="flex items-center gap-4"
              >
                {/* Previous Button */}
                <a
                  aria-disabled={page <= 1}
                  className={`group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    page <= 1
                      ? "pointer-events-none opacity-40 text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800/50"
                      : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-primary/5 dark:hover:bg-primary/10 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-primary/30"
                  }`}
                  href={`/blog?page=${page - 1}`}
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
                  Previous
                </a>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    const isCurrentPage = pageNum === page;

                    return (
                      <a
                        key={pageNum}
                        href={`/blog?page=${pageNum}`}
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          isCurrentPage
                            ? "bg-primary text-white shadow-lg shadow-primary/25 scale-110"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105"
                        }`}
                      >
                        {pageNum}
                        {isCurrentPage && (
                          <div className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-50" />
                        )}
                      </a>
                    );
                  })}
                </div>

                {/* Next Button */}
                <a
                  aria-disabled={page >= totalPages}
                  className={`group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    page >= totalPages
                      ? "pointer-events-none opacity-40 text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800/50"
                      : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-primary/5 dark:hover:bg-primary/10 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-primary/30"
                  }`}
                  href={`/blog?page=${page + 1}`}
                >
                  Next
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </AnimatedGroup>
            </div>

            {/* Page Info */}
            <div className="text-center mt-4">
              <AnimatedGroup preset="fade" viewportBehavior="once">
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-4 py-2 rounded-full">
                  Showing page {page} of {totalPages} ({total} total articles)
                </span>
              </AnimatedGroup>
            </div>
          </AnimatedGroup>
        </section>
      </main>
      <Footer />
    </div>
  );
}

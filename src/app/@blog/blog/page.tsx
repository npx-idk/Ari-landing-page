import { fetchBlogPostsPage } from "@/lib/contentful";
import HeroPost from "../_components/HeroPost";
import PostCard from "../_components/PostCard";
import Footer from "@/custom/footer";
import { Header } from "@/custom/header";

export const revalidate = 300;
export const runtime = "nodejs";

export default async function BlogIndexPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const pageParam = Array.isArray(searchParams?.page) ? searchParams?.page[0] : searchParams?.page;
  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, total } = await fetchBlogPostsPage({ limit: 6, page });
  const totalPages = Math.max(1, Math.ceil(total / 6));
  const featured = posts.find((p) => p.metadata?.tags?.some((t) => t.sys.id.toLowerCase().includes("featured")));
  const recent = posts[0];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-600/20">From our blog</span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl">Insights, stories, and tutorials</h1>
              <p className="mt-6 text-lg leading-8 text-neutral-600">Deep dives into design, development, and product — fresh from our team.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
          <div className="space-y-10">
            {featured && <HeroPost post={featured} label="Featured" />}
            {recent && (!featured || featured.sys.id !== recent.sys.id) && (
              <HeroPost post={recent} label="Recent" />
            )}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts
                .filter((p) => p.sys.id !== featured?.sys.id && p.sys.id !== recent?.sys.id)
                .map((post) => (
                  <PostCard key={post.sys.id} post={post} />
                ))}
            </div>
            <div className="flex items-center justify-center gap-3 pt-4">
              <a
                aria-disabled={page <= 1}
                className={`rounded-full px-4 py-2 text-sm ring-1 ring-black/10 ${page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-neutral-50"}`}
                href={`/blog?page=${page - 1}`}
              >
                ← Previous
              </a>
              <span className="text-sm text-neutral-600">Page {page} of {totalPages}</span>
              <a
                aria-disabled={page >= totalPages}
                className={`rounded-full px-4 py-2 text-sm ring-1 ring-black/10 ${page >= totalPages ? "pointer-events-none opacity-40" : "hover:bg-neutral-50"}`}
                href={`/blog?page=${page + 1}`}
              >
                Next →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}



import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { fetchBlogPostBySlug } from "@/lib/contentful";
import { format } from "date-fns";
import Footer from "@/custom/footer";
import { Header } from "@/custom/header";

export const revalidate = 300;
export const runtime = "nodejs";

type Params = { params: { slug: string } };

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
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={`https:${url}`} alt={title} className="my-6 rounded-xl" />;
      },
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        const href = node?.data?.uri as string;
        return (
          <a href={href} target="_blank" rel="noreferrer" className="text-brand-600 underline">
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <article>
          <header className="relative isolate">
            <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
              <Link href="/blog" className="text-sm text-neutral-500 hover:text-neutral-700">← Back to blog</Link>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>
              <p className="mt-2 text-neutral-600">
                {post.publishedDate ? format(new Date(post.publishedDate), "PPP") : null}
              </p>
            </div>
            {imageUrl && (
              <div className="mx-auto max-w-6xl px-6 pb-6 lg:px-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt={post.featuredImage?.fields.title || post.title} className="h-auto w-full rounded-3xl object-cover shadow-card" />
              </div>
            )}
          </header>

          <section className="mx-auto max-w-3xl px-6 pb-24 lg:px-8">
            <div className="prose">
              {documentToReactComponents(post.content as unknown as Document, options)}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}



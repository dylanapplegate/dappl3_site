import Head from "next/head";
import Layout from "@/components/Layout";
import { getAllSlugs, getContentBySlug } from "@/lib/markdown";

export default function BlogPost({ post }) {
  if (!post) {
    return (
      <Layout title="Post Not Found">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={post.title} description={post.excerpt} type="article">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: "Developer",
              },
            }),
          }}
        />
      </Head>

      <article className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <time className="text-sm text-gray-500 dark:text-gray-400 block mb-4">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getAllSlugs("blog");

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getContentBySlug("blog", params.slug);

  return {
    props: {
      post,
    },
  };
}

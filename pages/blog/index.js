import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllContent } from "@/lib/markdown";

export default function BlogIndex({ posts }) {
  return (
    <Layout
      title="Blog"
      description="Explore articles about web development, programming insights, and technology trends."
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          Blog
        </h1>
        <p className="mb-12 text-xl text-gray-600 dark:text-gray-300">
          Thoughts, tutorials, and insights about web development and
          technology.
        </p>

        {posts && posts.length > 0 ? (
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="pb-12 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
              >
                <div className="mb-4">
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-pink-500 dark:hover:text-pink-400"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>

                <Link href={`/blog/${post.slug}`} className="font-medium link">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No blog posts yet. Check back soon for new content!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllContent("blog");

  return {
    props: {
      posts,
    },
  };
}

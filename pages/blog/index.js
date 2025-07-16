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
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Thoughts, tutorials, and insights about web development and
          technology.
        </p>

        {posts && posts.length > 0 ? (
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-gray-200 dark:border-gray-700 pb-12 last:border-b-0 last:pb-0"
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

                <h2 className="text-2xl md:text-3xl font-bold font-serif text-gray-900 dark:text-white mb-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <Link href={`/blog/${post.slug}`} className="link font-medium">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
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

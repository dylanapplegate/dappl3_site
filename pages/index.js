import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllContent } from "@/lib/markdown";

export default function Home({ posts, projects }) {
  return (
    <Layout
      title="Home"
      description="Welcome to my developer blog and portfolio - featuring articles about web development and my latest projects."
    >
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-gray-900 dark:text-white mb-6">
          Welcome to My
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            {" "}
            Digital Space
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          I&apos;m a passionate developer sharing insights about web
          development, modern frameworks, and building great user experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blog" className="btn-primary inline-block">
            Read My Blog
          </Link>
          <Link href="/projects" className="btn-secondary inline-block">
            View Projects
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-serif text-gray-900 dark:text-white">
            Latest Posts
          </h2>
          <Link href="/blog" className="link font-medium">
            View all posts →
          </Link>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="mb-3">
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="text-xl font-semibold font-serif text-gray-900 dark:text-white mb-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No posts yet. Check back soon!
          </p>
        )}
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-serif text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <Link href="/projects" className="link font-medium">
            View all projects →
          </Link>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <article
                key={project.slug}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold font-serif text-gray-900 dark:text-white mb-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {project.excerpt}
                </p>
                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No projects yet. Check back soon!
          </p>
        )}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllContent("blog");
  const projects = await getAllContent("projects");

  return {
    props: {
      posts,
      projects,
    },
  };
}

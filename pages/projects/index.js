import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllContent } from "@/lib/markdown";

export default function ProjectsIndex({ projects }) {
  return (
    <Layout
      title="Projects"
      description="Explore my portfolio of web development projects, applications, and experiments."
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 dark:text-white mb-4">
          Projects
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          A collection of my work, experiments, and open-source contributions.
        </p>

        {projects && projects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-2xl font-bold font-serif text-gray-900 dark:text-white mb-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                  >
                    {project.title}
                  </Link>
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.excerpt}
                </p>

                {project.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
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

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="link font-medium"
                  >
                    Learn more →
                  </Link>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium transition-colors"
                    >
                      View on GitHub ↗
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium transition-colors"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects yet. Check back soon for new work!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const projects = await getAllContent("projects");

  return {
    props: {
      projects,
    },
  };
}

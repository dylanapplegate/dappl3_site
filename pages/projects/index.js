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
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          Projects
        </h1>
        <p className="mb-12 text-xl text-gray-600 dark:text-gray-300">
          A collection of my work, experiments, and open-source contributions.
        </p>

        {projects && projects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="p-6 transition-shadow duration-200 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg"
              >
                <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="transition-colors hover:text-pink-500 dark:hover:text-pink-400"
                  >
                    {project.title}
                  </Link>
                </h2>

                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  {project.excerpt}
                </p>

                {project.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-medium link"
                  >
                    Learn more →
                  </Link>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    >
                      View on GitHub ↗
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
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

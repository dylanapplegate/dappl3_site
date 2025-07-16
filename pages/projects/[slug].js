import Layout from "@/components/Layout";
import { getAllSlugs, getContentBySlug } from "@/lib/markdown";

export default function ProjectPage({ project }) {
  if (!project) {
    return (
      <Layout title="Project Not Found">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={project.title} description={project.excerpt}>
      <article className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {project.title}
          </h1>

          {project.excerpt && (
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {project.excerpt}
            </p>
          )}

          {/* Tags */}
          {project.tags && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View on GitHub
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Live Demo
              </a>
            )}
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: project.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getAllSlugs("projects");

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = await getContentBySlug("projects", params.slug);

  return {
    props: {
      project,
    },
  };
}

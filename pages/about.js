import Layout from "@/components/Layout";
import { getStaticContent } from "@/lib/markdown";

export default function About({ content, title, description }) {
  return (
    <Layout
      title={title || "About"}
      description={
        description ||
        "Learn more about me, my experience, and my passion for web development."
      }
    >
      <div className="max-w-3xl mx-auto">
        <div
          className="prose prose-lg dark:prose-dark max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const aboutContent = await getStaticContent("about");

  return {
    props: {
      content: aboutContent?.contentHtml || "<p>Content coming soon...</p>",
      title: aboutContent?.title || "About Me",
      description: aboutContent?.description || undefined,
    },
  };
}

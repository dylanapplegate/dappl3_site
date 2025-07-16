import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

// Get all slugs for a given content type
export function getAllSlugs(contentType) {
  const fullPath = path.join(contentDirectory, contentType);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const filenames = fs.readdirSync(fullPath);
  return filenames
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

// Get data for a single content item by slug
export async function getContentBySlug(contentType, slug) {
  const fullPath = path.join(contentDirectory, contentType, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Process markdown content to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...data,
  };
}

// Get all content items for a given type, sorted by date
export async function getAllContent(contentType) {
  const slugs = getAllSlugs(contentType);
  const allContent = await Promise.all(
    slugs.map(async (slug) => {
      const content = await getContentBySlug(contentType, slug);
      return content;
    }),
  );

  // Sort by date, newest first
  return allContent
    .filter((content) => content !== null)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
}

// Get content for a static page (like about.md)
export async function getStaticContent(filename) {
  const fullPath = path.join(contentDirectory, `${filename}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Process markdown content to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    ...data,
  };
}

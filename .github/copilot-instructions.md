# Copilot Instructions for Next.js Static Blog & Portfolio

## Architecture Overview

This is a **static-first Next.js blog** using Pages Router + SSG, designed for deployment to static hosts. The architecture follows a content-driven approach:

- **Content Layer**: Markdown files in `/content/` (blog posts, projects, about page)
- **Processing Layer**: `/lib/markdown.js` handles all content parsing with gray-matter + remark + rehype
- **Presentation Layer**: React components in `/components/` + pages in `/pages/`
- **Build Output**: Static files via `output: "export"` in `next.config.mjs`

## MCP Servers and Usage

The following MCP servers are available for integration and usage within the project:

- **GitHub**: Use for version control and repository management.
- **DeepWiki**: Use for storing and retrieving contextual information related to the project.
- **Sequential Thinking**: Use for breaking down complex tasks into smaller, manageable steps.
- **Memory**: Use for storing and retrieving contextual information during development.
- **Playwright**: Use for end-to-end testing workflows, including link checking and page crawling.
- **Context7**: Use for accessing up-to-date, version-specific documentation and resources.

### When to Use MCP Servers

- **GitHub**: Always use for managing code changes and collaborating with team members.
- **DeepWiki**: Use when detailed contextual documentation is required for specific components or workflows.
- **Sequential Thinking**: Use when planning or debugging complex features or workflows.
- **Memory**: Use for recalling previous decisions or configurations during development.
- **Playwright**: Use during testing phases to ensure all pages are functional and links are valid.
- **Context7**: Use when referencing documentation or resolving version-specific issues.

## Critical Content Processing Pipeline

The `/lib/markdown.js` file is the content engine - all content flows through these functions:

```javascript
getAllSlugs(contentType) → getStaticPaths()        // Discovers .md files
getContentBySlug(contentType, slug) → getStaticProps() // Parses individual files
getAllContent(contentType) → index pages           // Gets sorted content lists
getStaticContent(filename) → static pages          // For about.md etc.
```

**Key insight**: Content is processed with `remark` → `remarkRehype` → `rehypeHighlight` → `rehypeStringify` for syntax highlighting.

## SSG Implementation Pattern

**Every dynamic route** must use this exact pattern:

```javascript
// pages/blog/[slug].js & pages/projects/[slug].js
export async function getStaticPaths() {
  const slugs = getAllSlugs("blog"); // or "projects"
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false, // CRITICAL: false for static export
  };
}

export async function getStaticProps({ params }) {
  const content = await getContentBySlug("blog", params.slug);
  return { props: { post: content } }; // or { project: content }
}
```

## Content Schema Requirements

**All content** requires these frontmatter fields:

```yaml
---
title: "String"
date: "YYYY-MM-DD"
excerpt: "String"
---
```

**Projects** additionally require:

```yaml
tags: ["Array", "Of", "Strings"]
github: "https://github.com/..." # Optional
demo: "https://demo-url.com" # Optional
```

## Styling System (Tailwind CSS)

**Critical CSS import order** in `styles/globals.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@400;500;600;700&display=swap");
@import "tailwindcss";
```

**Typography hierarchy**:

- Body text: `Inter` (via CSS `font-family`)
- Headings: `Syne` (via CSS h1-h6 selectors)
- Content: `@tailwindcss/typography` for markdown rendering

**Theme system**: Uses `next-themes` with `darkMode: "class"` and CSS custom properties for consistent theming.

## Dark Mode Guidelines

- All UI components must include Tailwind's `dark:` variant styles for backgrounds, text, borders, and interactive states.
- Components should be tested in both light and dark themes before PR approval.
- Any new component or layout must default to theme-aware color tokens and utility classes.
- Interactive states (hover, focus, active) must be styled for both light and dark modes.
- Do not use custom CSS unless absolutely necessary; prefer Tailwind utilities.
- Do not remove existing light mode styles when adding dark mode support.
- Avoid adding Tailwind classes without considering theme parity and accessibility.
- Do not break responsiveness while applying theme updates.

**Example pattern for new components:**

```jsx
// Before (light only)
<div className="bg-white text-gray-900 shadow-md">
  <button className="bg-gray-100 hover:bg-gray-200">Click me</button>
</div>

// After (dark mode added)
<div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 shadow-md">
  <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300">
    Click me
  </button>
</div>
```

## Development Workflows

### Adding Content

```bash
# Creates /blog/new-post route automatically
echo "---\ntitle: \"New Post\"\ndate: \"$(date +%Y-%m-%d)\"\nexcerpt: \"Description\"\n---\n\nContent here..." > content/blog/new-post.md

# Creates /projects/new-project route automatically
echo "---\ntitle: \"New Project\"\ndate: \"$(date +%Y-%m-%d)\"\nexcerpt: \"Description\"\ntags: [\"React\"]\n---\n\nContent here..." > content/projects/new-project.md
```

### Build & Test

```bash
npm run dev --turbopack        # Development with Turbopack
npm run build                  # Static export to /out
npm run test:e2e              # Playwright link checker
```

**Testing**: Includes comprehensive Playwright E2E tests that crawl all pages and check for broken links.

## Component Architecture

**Layout Pattern**: All pages wrap content in `Layout` component:

```jsx
<Layout title="Page Title" description="SEO description" type="article">
  {/* content */}
</Layout>
```

**SEO**: Layout automatically handles meta tags, Open Graph, and JSON-LD structured data for blog posts.

## Static Export Constraints

- **No API routes** (unsupported by static export)
- **No `next/image` optimization** (`unoptimized: true` required)
- **No server-side features** (middleware, ISR, etc.)
- **Markdown-only content** (no CMS dependencies)

## Key Files to Understand

- `/lib/markdown.js` - Content processing engine
- `/pages/blog/[slug].js` - Dynamic route template
- `/components/Layout.js` - SEO and theme wrapper
- `/styles/globals.css` - Theme system and typography
- `/next.config.mjs` - Static export configuration

## Verification Requirements

**Always test locally before deployment:**

1. Run `npm run build` and verify `/out` directory
2. Test new content routes work correctly
3. Run `npm run test:e2e` to check for broken links
4. Verify dark/light theme switching works

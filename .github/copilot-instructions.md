# Copilot Instructions for Next.js Static Blog & Portfolio

## Architecture Overview

This is a **static-first Next.js blog** using Pages Router + SSG, designed for deployment to static hosts. The architecture follows a content-driven approach:

- **Content Layer**: Markdown files in `/content/` (blog posts, projects, about page)
- **Processing Layer**: `/lib/markdown.js` handles all content parsing with gray-matter + remark + rehype
- **Presentation Layer**: React components in `/components/` + pages in `/pages/`
- **Build Output**: Static files via `output: "export"` in `next.config.mjs`

## Critical Static Export Requirements

⚠️ **BREAKING CONSTRAINTS** - These will break the build if violated:

- `fallback: false` in `getStaticPaths()` - **REQUIRED** for static export
- `output: "export"` in `next.config.mjs` - enables static file generation
- `images: { unoptimized: true }` - Next.js image optimization incompatible with static export
- No API routes - unsupported by static export
- No server-side features (middleware, ISR, rewrites, redirects)

## Thinking steps

- Always use Context7 MCP to get latest version of package documentation before making changes.

## Content Processing Pipeline

**CRITICAL**: All content flows through `/lib/markdown.js` functions:

```javascript
getAllSlugs(contentType) → getStaticPaths()        // Discovers .md files in /content/{contentType}/
getContentBySlug(contentType, slug) → getStaticProps() // Parses individual files with frontmatter
getAllContent(contentType) → index pages           // Gets sorted content lists (newest first)
getStaticContent(filename) → static pages          // For /content/about.md etc.
```

**Processing chain**: markdown → gray-matter (frontmatter) → remark → remarkRehype → rehypeHighlight → rehypeStringify

## SSG Implementation Pattern

**Every dynamic route** must follow this EXACT pattern (critical for static export):

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

**All content** requires frontmatter with these fields:

```yaml
---
title: "String"
date: "YYYY-MM-DD" # Used for sorting (newest first)
excerpt: "String" # Used for SEO meta descriptions
---
```

**Projects** additionally require:

```yaml
tags: ["Array", "Of", "Strings"] # For filtering/display
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
- Dark mode is controlled by the user's browser `prefers-color-scheme` setting - no manual toggle is provided.
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

### Adding Content (Auto-creates routes)

```bash
# Creates /blog/new-post route (after running `npm run build` – routes are generated during the SSG build phase)
echo "---\ntitle: \"New Post\"\ndate: \"$(date +%Y-%m-%d)\"\nexcerpt: \"Description\"\n---\n\nContent here..." > content/blog/new-post.md

# Creates /projects/new-project route automatically
echo "---\ntitle: \"New Project\"\ndate: \"$(date +%Y-%m-%d)\"\nexcerpt: \"Description\"\ntags: [\"React\"]\n---\n\nContent here..." > content/projects/new-project.md
```

### Build & Test Pipeline

```bash
npm run dev --turbopack        # Development with Turbopack
npm run build                  # Static export to /out (required for testing)
npm run test:e2e              # Playwright comprehensive link checker
npm run test:e2e:ui           # Interactive test debugging
npm run test:e2e:github       # CI-optimized (used in GitHub Actions)
npm run lint                  # ESLint validation
```

**Critical**: E2E tests require `npm run build` first - they test the static `/out` directory served via http-server on port 3001.

### GitHub Actions Integration

PR to `main` triggers automatic:

1. **Lint check** - ESLint validation on all code
2. **E2E tests** - Comprehensive site crawl checking for broken links across all browsers (Chromium, Firefox, WebKit)
3. **Artifact upload** - Test reports saved for 30 days for debugging

## Component Architecture & SEO

**Layout Pattern**: All pages wrap content in `Layout` component with automatic SEO:

```jsx
<Layout title="Page Title" description="SEO description" type="article">
  {/* content */}
</Layout>
```

**SEO Features**: Layout automatically handles:

- Meta tags (title, description, viewport)
- Open Graph (og:title, og:description, og:type)
- Twitter Cards (summary_large_image)
- JSON-LD structured data for articles (in blog posts)

**Typography System**:

- Body text: `Inter` font via CSS `font-family`
- Headings: `Syne` font via CSS h1-h6 selectors
- Content rendering: `@tailwindcss/typography` prose classes
- Code highlighting: `rehype-highlight` with syntax highlighting

## Verification Requirements

**Always verify before deployment:**

1. `npm run build` - Check `/out` directory generates correctly
2. `npm run test:e2e` - Verify all links work and pages render
3. Test dark/light theme switching works
4. Verify new content appears in index pages (sorted by date, newest first)
5. Check that new routes are accessible via file-based routing

## Final Verification Commands (Agent Requirement)

**Before considering any task complete, the agent must run the following commands to ensure the project works correctly:**

```bash
npm run build
npm run lint
npm run test:e2e:ci
```

Only after all commands succeed should the agent consider the task done.

## Key Files & Their Roles

- `/lib/markdown.js` - Content processing engine (all content flows through here)
- `/pages/blog/[slug].js` - Dynamic route template for blog posts
- `/pages/projects/[slug].js` - Dynamic route template for projects
- `/components/Layout.js` - SEO wrapper + theme provider
- `/styles/globals.css` - Theme system with CSS custom properties
- `/next.config.mjs` - Static export configuration (critical for deployment)
- `/playwright.config.ts` - E2E test configuration (builds site before testing)
- `/.github/workflows/pr-checks.yml` - CI/CD pipeline for PRs

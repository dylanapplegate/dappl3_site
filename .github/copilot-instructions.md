# Copilot Instructions for Next.js Blog & Portfolio Starter

## Architecture Overview
This is a **static-first Next.js blog** using Pages Router + SSG, designed for deployment to static hosts like GitHub Pages. The architecture follows a content-driven approach:

- **Content Layer**: Markdown files in `/content/` (blog posts, projects, about page)
- **Processing Layer**: `/lib/markdown.js` handles all content parsing with gray-matter + remark
- **Presentation Layer**: React components in `/components/` + pages in `/pages/`
- **Build Output**: Static files via `output: "export"` in `next.config.mjs`

## Critical File Dependencies

### Content Processing Pipeline
```javascript
// /lib/markdown.js - Core content utilities
getAllSlugs(contentType) → getStaticPaths()
getContentBySlug(contentType, slug) → getStaticProps() 
getAllContent(contentType) → index pages
getStaticContent(filename) → static pages like /about
```

### SSG Implementation Pattern
All dynamic routes use this exact pattern:
```javascript
// pages/[contentType]/[slug].js
export async function getStaticPaths() {
  const slugs = getAllSlugs('blog'); // or 'projects'
  return { paths: slugs.map(slug => ({params: {slug}})), fallback: false };
}

export async function getStaticProps({params}) {
  const content = await getContentBySlug('blog', params.slug);
  return { props: { [contentType]: content } };
}
```

## Content Frontmatter Schema
**Required fields for all content:**
```yaml
---
title: "String"
date: "YYYY-MM-DD"
excerpt: "String"
---
```

**Additional for projects:**
```yaml
tags: ['Array', 'Of', 'Strings']
github: "https://github.com/..."
demo: "https://demo-url.com"
```

## Styling System (Tailwind v4)
**Critical CSS import order** (must be exact):
```css
/* styles/globals.css */
@import url("https://fonts.googleapis.com/..."); /* Google Fonts FIRST */
@import "tailwindcss"; /* Tailwind SECOND */
```

**Typography hierarchy:**
- Body text: `Inter` (applied via CSS `font-family`)
- Headings: `Lora` serif (applied to h1-h6 in CSS)
- Custom utilities: `.btn-primary`, `.btn-secondary`, `.link`

## Development Workflows

### Adding New Content
```bash
# Blog post: creates /blog/filename route
touch content/blog/filename.md

# Project: creates /projects/filename route  
touch content/projects/filename.md

# Both auto-discovered by getAllSlugs() at build time
```

### Build & Deploy
```bash
npm run build  # Creates /out directory with static files
# Deploy /out to any static host (GitHub Pages, Netlify, Vercel)
```

## Component Patterns

### Layout System
- `Layout.js` - Universal wrapper with SEO meta tags
- `Header.js` - Navigation + theme toggle (uses next-themes)
- `Footer.js` - Social links + copyright

### SEO Implementation
All pages use Layout component with props:
```jsx
<Layout title="Page Title" description="Page description" type="article">
```
Blog posts automatically include JSON-LD structured data.

## Key Constraints
- **No API routes** (static export doesn't support them)
- **No next/image optimization** (`unoptimized: true` in config)
- **No server-side features** (middleware, ISR, etc.)
- **Markdown only** for content (no CMS integration)

## Theme System
Uses `next-themes` with class-based dark mode:
- Toggle in Header component
- Tailwind classes: `dark:` prefix for dark mode styles
- System preference detection enabled

When modifying this codebase:
1. Content changes only require adding/editing markdown files
2. Styling uses Tailwind utilities - avoid custom CSS
3. All routes are static - use getStaticProps/getStaticPaths pattern
4. Test build output with `npm run build` before deployment

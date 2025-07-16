# AI Agent Instructions

Hello! I am a Next.js and Markdown-based blog and portfolio site. Here's how you can help me.

## How to Add New Content

- **To add a new blog post:** Create a new `.md` file in `/content/blog/`. The filename will be the URL slug.
- **To add a new project:** Create a new `.md` file in `/content/projects/`.
- **Required Frontmatter:** Every content file needs `title` (string), `date` (string, `YYYY-MM-DD`), and `excerpt` (string).

### Example Blog Post Frontmatter

```yaml
---
title: "My Awesome Post"
date: "2025-07-16"
excerpt: "A brief description of what this post is about."
---
```

### Example Project Frontmatter

```yaml
---
title: 'My Cool Project'
date: '2025-07-16'
excerpt: 'What this project does and why it's interesting.'
tags: ['React', 'Next.js', 'Tailwind']
github: 'https://github.com/username/repo'
demo: 'https://demo-url.com'
---
```

## How to Change My Appearance

- **Global styles** are in `/styles/globals.css`.
- **Layout components** (Header, Footer) are in the `/components` directory.
- **Color palette** is defined using Tailwind CSS classes. You can modify colors in `tailwind.config.js`.
- **Fonts** are imported in `/styles/globals.css` using Google Fonts.

## Project Structure

```
/
├── components/         # React components (Layout, Header, Footer)
├── content/           # Markdown content
│   ├── blog/          # Blog posts
│   ├── projects/      # Project showcases
│   └── about.md       # About page content
├── lib/               # Utility functions
│   └── markdown.js    # Markdown processing utilities
├── pages/             # Next.js routes
│   ├── blog/          # Blog-related pages
│   ├── projects/      # Project-related pages
│   ├── about.js       # About page
│   └── index.js       # Homepage
├── public/            # Static assets
└── styles/            # CSS files
```

## Common Tasks

- **To create a new static page:** Add a new `.js` file to the `/pages` directory.
- **To add a new component:** Create a new `.js` file in the `/components` directory and import it where needed.
- **To modify SEO:** Update the `Layout` component in `/components/Layout.js`.
- **To change the theme:** Modify the theme configuration in `tailwind.config.js`.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This site is configured for static export. To deploy:

1. Run `npm run build`
2. The static files will be in the `out/` directory
3. Deploy the `out/` directory to any static hosting provider

## Key Features

- 🌙 Dark/light mode toggle
- 📱 Fully responsive design
- ⚡ Static site generation for performance
- 🔍 SEO optimized with meta tags and structured data
- 📝 Markdown-based content management
- 🎨 Tailwind CSS for styling

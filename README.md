# Next.js Developer Blog & Portfolio Starter

This is a starter kit for building a fast, modern, and content-focused personal website using Next.js and Tailwind CSS.

## 🚀 Features

- **⚡ Fast Performance** - Static site generation for lightning-fast loading
- **🌙 Dark Mode** - Beautiful dark/light theme switching with next-themes
- **📱 Responsive** - Mobile-first design that looks great on all devices
- **🔍 SEO Optimized** - Built-in SEO with meta tags and structured data
- **📝 Markdown Content** - Write posts and projects in Markdown
- **🎨 Beautiful Design** - Clean, minimalist design inspired by modern developer blogs
- **🛠️ Developer Friendly** - Easy to customize and extend

## 🛠️ Tech Stack

- **Framework**: Next.js (Static Site Generation)
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter
- **Theming**: next-themes for dark/light mode
- **SEO**: next-seo for meta tags and Open Graph
- **Typography**: Inter + Lora font pairing

## 📁 Project Structure

```
/
├── components/         # Reusable React components
│   ├── Layout.js      # Main layout wrapper
│   ├── Header.js      # Site header with navigation
│   └── Footer.js      # Site footer
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

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📝 Adding Content

### Blog Posts

Create new `.md` files in `/content/blog/`:

```yaml
---
title: "Your Post Title"
date: "2025-07-16"
excerpt: "A brief description of your post."
---
Your markdown content here...
```

### Projects

Create new `.md` files in `/content/projects/`:

```yaml
---
title: "Your Project Title"
date: "2025-07-16"
excerpt: "What your project does."
tags: ["React", "Next.js", "Tailwind"]
github: "https://github.com/username/repo"
demo: "https://your-demo.com"
---
Your project description...
```

### About Page

Edit `/content/about.md` to customize your about page.

## 🎨 Customization

### Colors and Styling

Modify `tailwind.config.js` to customize:

- Color palette
- Typography settings
- Spacing and layout

### Layout and Components

Update components in `/components/` to change:

- Site header and navigation
- Footer content and links
- Overall layout structure

### SEO Settings

Customize SEO in `/components/Layout.js`:

- Site title and description
- Open Graph settings
- Structured data

## 🚀 Deployment

This site is configured for static export and can be deployed to any static hosting provider.

### Build for Production

```bash
npm run build
```

The static files will be generated in the `out/` directory.

### Deploy to Vercel (Recommended)

```bash
npx vercel
```

### Deploy to GitHub Pages

1. Build the site: `npm run build`
2. Push the `out/` directory to your GitHub Pages repository
3. Configure GitHub Pages to serve from the root directory

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `out`

## 🧠 AI-Agent Ready

This project is optimized for collaboration with AI coding agents:

- **`agent-manifest.json`** - Machine-readable project configuration
- **`copilot-instructions.md`** - Human-readable setup and usage guide
- **Clear structure** - Organized codebase that's easy to understand and modify

## 📄 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and Tailwind CSS

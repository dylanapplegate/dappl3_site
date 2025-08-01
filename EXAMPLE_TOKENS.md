# Example: Generated Tokens Structure

This file shows example output from the token generation system.

## 🎨 Color Tokens

### Default Tailwind Colors

```json
{
  "global": {
    "color": {
      "slate": {
        "50": "#f8fafc",
        "500": "#64748b",
        "900": "#0f172a"
      },
      "blue": {
        "50": "#eff6ff",
        "500": "#3b82f6",
        "900": "#1e3a8a"
      }
    }
  }
}
```

### Custom Colors

```json
{
  "global": {
    "color": {
      "warm": {
        "gray": {
          "50": "#eae6e0",
          "500": "#c6bdb5",
          "700": "#8e7f73"
        }
      },
      "hot": {
        "pink": {
          "50": "#FFF0F8",
          "500": "#FF2D88",
          "900": "#660033"
        },
        "blue": {
          "50": "#F0F7FF",
          "500": "#007BFF",
          "900": "#00264D"
        },
        "purple": {
          "50": "#F7F0FF",
          "500": "#8A2BE2",
          "900": "#330D55"
        }
      }
    }
  }
}
```

## 📐 Spacing Tokens

```json
{
  "global": {
    "spacing": {
      "0": "0px",
      "1": "0.25rem",
      "4": "1rem",
      "8": "2rem",
      "16": "4rem",
      "px": "1px"
    }
  }
}
```

## 🔤 Typography Tokens

```json
{
  "global": {
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem"
    },
    "fontFamily": {
      "sans": "ui-sans-serif, system-ui, sans-serif",
      "serif": "ui-serif, Georgia, Times, serif",
      "mono": "ui-monospace, SFMono-Regular, Consolas, monospace"
    }
  }
}
```

## 🔘 Border Radius Tokens

```json
{
  "global": {
    "borderRadius": {
      "none": "0px",
      "sm": "0.125rem",
      "DEFAULT": "0.25rem",
      "md": "0.375rem",
      "lg": "0.5rem",
      "full": "9999px"
    }
  }
}
```

## 🌑 Shadow Tokens

```json
{
  "global": {
    "boxShadow": {
      "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      "none": "none"
    }
  }
}
```

## 🔗 Usage in Code

### Tailwind CSS Classes

```html
<!-- Custom colors -->
<div class="bg-hot-pink-500 text-white">Hot Pink Background</div>
<div class="bg-warm-gray-100 text-warm-gray-700">Warm Gray Background</div>
<div class="bg-hot-blue-600 text-white">Hot Blue Background</div>
<div class="bg-hot-purple-500 text-white">Hot Purple Background</div>

<!-- Standard spacing -->
<div class="p-4 m-8 space-y-2">Content with spacing</div>

<!-- Typography -->
<h1 class="text-4xl font-sans">Large Sans Heading</h1>
<p class="text-base font-serif">Body text in serif</p>
<code class="text-sm font-mono">Code in monospace</code>
```

### Figma Token References

In Figma Tokens Studio, these tokens are referenced as:

- `global.color.hot.pink.500` → #FF2D88
- `global.color.warm.gray.700` → #8e7f73
- `global.spacing.4` → 1rem
- `global.fontSize.xl` → 1.25rem
- `global.borderRadius.lg` → 0.5rem

## 🔄 Token Generation Flow

1. **Source**: `tailwind.config.js` contains all design tokens
2. **Build**: `npm run build:tokens` processes the config
3. **Output**: `tokens.json` generated in Figma Tokens format
4. **Import**: Upload `tokens.json` to Figma Tokens Studio
5. **Apply**: Use tokens in your Figma designs

This creates a single source of truth for design tokens that works across both development and design tools.

# Design Token System with Style Dictionary

This project uses Style Dictionary to automatically generate design tokens from the Tailwind CSS configuration, making them compatible with Figma Tokens Studio.

## ✅ What's Included

### Token Categories Generated:

- **Colors**: All Tailwind default colors + custom colors (warm-gray, hot-pink, hot-blue, hot-purple)
- **Spacing**: Complete Tailwind spacing scale (px, 0-96, and fractional values)
- **Typography**: Font sizes (xs-9xl), font families (sans, serif, mono)
- **Border Radius**: All border radius tokens (none, sm, md, lg, xl, 2xl, 3xl, full)
- **Box Shadows**: Complete shadow scale (sm, md, lg, xl, 2xl, inner, none)

### Custom Colors:

Our design system includes these custom color palettes:

- `warm-gray`: 7 shades (50-700)
- `hot-pink`: 9 shades (50-900)
- `hot-blue`: 9 shades (50-900)
- `hot-purple`: 9 shades (50-900)

## 🚀 Usage

### Regenerate Tokens

Whenever you modify the Tailwind configuration, run:

```bash
npm run build:tokens
```

This will:

1. Parse your `tailwind.config.js` file
2. Extract all theme values (colors, spacing, typography, etc.)
3. Generate a new `tokens.json` file in Figma Tokens Studio format

### Add New Colors

To add new colors to the design system:

1. **Edit `tailwind.config.js`** - Add your colors to the `theme.extend.colors` section:

```javascript
theme: {
  extend: {
    colors: {
      'brand-blue': {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a'
      }
    }
  }
}
```

2. **Regenerate tokens**:

```bash
npm run build:tokens
```

3. **Import to Figma** - Use the generated `tokens.json` with Figma Tokens Studio plugin

### Token Structure

The generated tokens follow this structure for Figma compatibility:

```json
{
  "$themes": [
    {
      "id": "light",
      "name": "Light Theme",
      "selectedTokenSets": {
        "global": "enabled"
      }
    }
  ],
  "global": {
    "color": {
      "hot": {
        "pink": {
          "500": "#FF2D88"
        }
      }
    },
    "spacing": {
      "4": "1rem"
    }
  }
}
```

## 🎨 Figma Integration

### Import Tokens to Figma:

1. Install the [Figma Tokens Studio](https://www.figma.com/community/plugin/843461159747178946/Figma-Tokens) plugin
2. Open your Figma file
3. Launch Figma Tokens Studio
4. Go to Settings → Import/Export
5. Upload your `tokens.json` file
6. Apply the tokens to your design

### Token Naming Convention:

- Tailwind: `bg-hot-pink-500`
- Figma: `global.color.hot.pink.500`

## 🛠 Development Workflow

### Making Changes:

1. **Update colors** → Edit `tailwind.config.js`
2. **Regenerate** → Run `npm run build:tokens`
3. **Test locally** → Run `npm run build` and `npm run test:e2e`
4. **Update Figma** → Import new `tokens.json` to Figma Tokens Studio

### File Structure:

```
├── tailwind.config.js     # Source of truth for design tokens
├── tokens.json           # Generated Figma-compatible tokens
├── scripts/
│   └── build-tokens.js   # Token generation script
└── sd.config.json        # Style Dictionary configuration
```

## 🔧 Technical Details

### Dependencies:

- `style-dictionary` - Token build system
- `@tailwindcss/typography` - Typography plugin

### Build Process:

1. **Dynamic Import** - Loads Tailwind config as ES module
2. **Token Extraction** - Merges default Tailwind tokens with custom extensions
3. **Structure Conversion** - Transforms flat color names to nested objects
4. **Figma Format** - Outputs in Tokens Studio compatible JSON structure

### Supported Token Types:

- Colors (all format types)
- Dimensions (spacing, border-radius)
- Typography (font-size, font-family)
- Shadows (box-shadow)

## 📋 Troubleshooting

### Common Issues:

**Error: "require is not defined"**

- Solution: Make sure `tailwind.config.js` uses ES module syntax (`import` not `require`)

**Missing custom colors**

- Solution: Ensure colors are in `theme.extend.colors` in `tailwind.config.js`
- Run `npm run build:tokens` to regenerate

**Tokens not updating in Figma**

- Solution: Re-import the `tokens.json` file in Figma Tokens Studio
- Clear browser cache if needed

### Verification:

After running `npm run build:tokens`, verify:

- ✅ `tokens.json` exists and has recent timestamp
- ✅ Custom colors appear in the file
- ✅ No errors in terminal output
- ✅ Project still builds: `npm run build`

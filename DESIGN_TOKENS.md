# Design Token System

This project uses a comprehensive design token system powered by [Style Dictionary](https://styledictionary.com/) to manage design tokens and transform them into multiple output formats.

## Architecture Overview

The design token system has been refactored to leverage Style Dictionary's full capabilities:

```
Tailwind Config (theme.extend) → tokens.json → Style Dictionary → Multiple Output Formats
```

## Build Process

### 1. Token Extraction

The `scripts/build-tokens.js` script extracts custom tokens from `tailwind.config.js` (specifically from `theme.extend`) and converts them into a Style Dictionary-compatible format in `tokens.json`.

### 2. Style Dictionary Transformation

Style Dictionary then processes `tokens.json` and generates multiple output formats using platform-specific transforms and formats.

## Generated Files

### Input

- `tokens.json` - Source tokens in Style Dictionary format

### Outputs

- `tokens.figma.json` - Flattened tokens for Figma Tokens Studio plugin
- `build/tokens.css` - CSS custom properties with `:root` selector
- `build/tokens.scss` - SCSS variables with `$` prefix
- `build/tokens.js` - JavaScript ES6 module with named exports
- `build/tokens.d.ts` - TypeScript declarations for type safety
- `build/tokens.json` - Nested JSON structure for programmatic use

## Available Scripts

### Primary Build Script

```bash
npm run build:tokens
```

This runs the complete pipeline:

1. Extracts tokens from Tailwind config
2. Generates `tokens.json`
3. Transforms tokens using Style Dictionary
4. Creates all output formats

### Style Dictionary Only

```bash
npm run build:tokens:sd
```

This runs only the Style Dictionary transformation step (requires existing `tokens.json`).

## Configuration Files

### Style Dictionary Config (`sd.config.json`)

Defines transformation rules and output formats for Style Dictionary. Each platform specifies:

- **transformGroup**: How tokens are transformed (css, scss, js)
- **buildPath**: Output directory
- **files**: Specific output files with formats and options

### Build Script (`scripts/build-tokens.js`)

- Extracts tokens from Tailwind config
- Converts to Style Dictionary format
- Programmatically builds all platforms
- Provides enhanced logging and error handling

## Token Types

The system automatically detects and assigns appropriate types:

- **color**: Hex, rgb, rgba, hsl, hsla, and named colors
- **fontSize**: Font size values with optional line height
- **fontFamily**: Font family stacks
- **spacing**: Spacing and sizing values

## Usage Examples

### CSS Custom Properties

```css
/* Use the generated CSS variables */
.my-element {
  background-color: var(--global-colors-hot-pink-500);
  padding: var(--global-spacing-4);
}
```

### SCSS Variables

```scss
/* Import and use SCSS variables */
@import "build/tokens.scss";

.my-element {
  background-color: $global-colors-hot-pink-500;
  padding: $global-spacing-4;
}
```

### JavaScript/TypeScript

```typescript
// Import tokens with full type safety
import { GlobalColorsHotPink500, GlobalSpacing4 } from "./build/tokens.js";

const styles = {
  backgroundColor: GlobalColorsHotPink500,
  padding: GlobalSpacing4,
};
```

### JSON (Programmatic)

```javascript
// Import nested JSON structure
import tokens from "./build/tokens.json";

const primaryColor = tokens.global.colors.hotPink[500].value;
```

## Figma Integration

The `tokens.figma.json` file is specifically formatted for the [Figma Tokens Studio](https://tokens.studio/) plugin, enabling seamless design-to-code workflows.

## Benefits of Style Dictionary

1. **Consistency**: Single source of truth for design tokens
2. **Platform Agnostic**: Generate tokens for any platform/format
3. **Scalability**: Easy to add new platforms or modify existing ones
4. **Type Safety**: TypeScript declarations for development confidence
5. **Automation**: Integrates with build processes and CI/CD
6. **Standards**: Uses industry-standard token formats and naming conventions

## Adding New Tokens

1. Add tokens to `tailwind.config.js` in the `theme.extend` section
2. Run `npm run build:tokens` to regenerate all formats
3. Import and use tokens in your preferred format

## Adding New Output Formats

To add a new platform or format:

1. Update `sd.config.json` with new platform configuration
2. Optionally update `scripts/build-tokens.js` to include the new platform
3. Run the build process to generate new outputs

Example platform addition:

```json
{
  "android": {
    "transformGroup": "android",
    "buildPath": "./build/android/",
    "files": [
      {
        "destination": "colors.xml",
        "format": "android/colors"
      }
    ]
  }
}
```

## File Headers

All generated files include automatic headers indicating they are auto-generated and should not be edited directly. This is managed by Style Dictionary's `showFileHeader` option.

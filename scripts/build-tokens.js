#!/usr/bin/env node

/**
 * Build script for design tokens using Style Dictionary
 * This script extracts tokens from Tailwind config, generates tokens.json,
 * and uses Style Dictionary to transform them for various platforms
 */

import StyleDictionary from "style-dictionary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load only the extended theme from Tailwind config
async function loadExtendedTailwindTheme() {
  try {
    // Import the Tailwind config
    const configModule = await import(
      `file://${path.resolve(__dirname, "../tailwind.config.js")}`
    );
    const tailwindConfig = configModule.default;

    // Only extract custom tokens from theme.extend
    const extendedTheme = tailwindConfig.theme?.extend || {};
    return extendedTheme;
  } catch (error) {
    console.error("Error loading Tailwind config:", error);
    throw error;
  }
}

// Check if a value is a color
function isColor(value) {
  if (typeof value !== "string") return false;

  // Check for hex colors (#000, #000000)
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) return true;

  // Check for rgb/rgba
  if (/^rgba?\(/i.test(value)) return true;

  // Check for hsl/hsla
  if (/^hsla?\(/i.test(value)) return true;

  // Check for named CSS colors (common ones)
  const namedColors = [
    "transparent",
    "currentColor",
    "inherit",
    "initial",
    "unset",
    "white",
    "black",
    "red",
    "green",
    "blue",
  ];
  if (namedColors.includes(value.toLowerCase())) return true;

  return false;
}

// Convert values to Style Dictionary format, handling different value types
function convertToTokenFormat(value, key) {
  // Handle fontSize arrays [size, { lineHeight: '...' }]
  if (key.includes("fontSize") && Array.isArray(value) && value.length === 2) {
    return {
      value: value[0],
      lineHeight: value[1].lineHeight || value[1],
      type: "fontSize",
    };
  }

  // Handle fontFamily arrays
  if (key.includes("fontFamily") && Array.isArray(value)) {
    return {
      value: value.join(", "),
      type: "fontFamily",
    };
  }

  // Handle spacing values
  if (key.includes("spacing")) {
    return {
      value: value,
      type: "spacing",
    };
  }

  // Handle regular values
  const token = {
    value: value,
  };

  // Add type for colors
  if (isColor(value) || key.includes("colors") || key.includes("color")) {
    token.type = "color";
  }

  return token;
}

// Convert Tailwind theme object to tokens format recursively
function convertThemeToTokens(obj, parentKey = "") {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      // Recursively process nested objects
      result[key] = convertThemeToTokens(value, currentKey);
    } else {
      // Convert leaf values to token format
      result[key] = convertToTokenFormat(value, currentKey);
    }
  }

  return result;
}

// Generate tokens.json from Tailwind config
async function generateTokensFile() {
  console.log("🚀 Extracting tokens from Tailwind config...");

  // Load only custom tokens from theme.extend
  const extendedTheme = await loadExtendedTailwindTheme();

  // Convert theme to tokens format
  const tokens = {
    $themes: [
      {
        id: "light",
        name: "Light Theme",
        selectedTokenSets: {
          global: "enabled",
        },
        $figmaStyleReferences: {},
      },
    ],
    global: convertThemeToTokens(extendedTheme),
  };

  // Write the tokens file
  const outputPath = path.resolve(__dirname, "../tokens.json");
  fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));

  console.log("✅ tokens.json generated successfully");
  console.log(
    `🎨 Generated tokens for: ${Object.keys(extendedTheme).join(", ")}`,
  );

  return { extendedTheme, outputPath };
}

// Build tokens using Style Dictionary
async function buildWithStyleDictionary() {
  console.log("🔄 Building tokens with Style Dictionary...");

  try {
    // Initialize Style Dictionary with enhanced configuration
    const sd = new StyleDictionary({
      source: ["tokens.json"],
      platforms: {
        // Generate flattened tokens for Figma
        figma: {
          transformGroup: "js",
          buildPath: "./",
          files: [
            {
              destination: "tokens.figma.json",
              format: "json/flat",
              options: {
                showFileHeader: true,
              },
            },
          ],
        },
        // Generate CSS custom properties for web use
        css: {
          transformGroup: "css",
          buildPath: "./build/",
          files: [
            {
              destination: "tokens.css",
              format: "css/variables",
              options: {
                showFileHeader: true,
                outputReferences: true,
              },
            },
          ],
        },
        // Generate JavaScript/JSON for programmatic use
        js: {
          transformGroup: "js",
          buildPath: "./build/",
          files: [
            {
              destination: "tokens.js",
              format: "javascript/es6",
              options: {
                showFileHeader: true,
              },
            },
            {
              destination: "tokens.json",
              format: "json/nested",
              options: {
                showFileHeader: false,
              },
            },
          ],
        },
        // Generate SCSS variables for Sass/SCSS projects
        scss: {
          transformGroup: "scss",
          buildPath: "./build/",
          files: [
            {
              destination: "tokens.scss",
              format: "scss/variables",
              options: {
                showFileHeader: true,
                outputReferences: true,
              },
            },
          ],
        },
        // Generate TypeScript declarations for type safety
        ts: {
          transformGroup: "js",
          buildPath: "./build/",
          files: [
            {
              destination: "tokens.d.ts",
              format: "typescript/es6-declarations",
              options: {
                showFileHeader: true,
              },
            },
          ],
        },
      },
    });

    // Build all platforms
    await sd.buildAllPlatforms();

    console.log("✅ Style Dictionary build completed successfully");
    console.log("📁 Generated files:");
    console.log("   • tokens.figma.json (for Figma Tokens Studio)");
    console.log("   • build/tokens.css (CSS custom properties)");
    console.log("   • build/tokens.scss (SCSS variables)");
    console.log("   • build/tokens.js (JavaScript/ES6 module)");
    console.log("   • build/tokens.d.ts (TypeScript declarations)");
    console.log("   • build/tokens.json (nested JSON structure)");
  } catch (error) {
    console.error("❌ Style Dictionary build failed:", error);
    throw error;
  }
}

async function buildTokens() {
  try {
    // Step 1: Generate tokens.json from Tailwind config
    const { extendedTheme } = await generateTokensFile();

    // Step 2: Transform tokens using Style Dictionary
    await buildWithStyleDictionary();

    // Summary
    console.log("\n🎉 Token build process completed!");

    if (extendedTheme.colors) {
      console.log(
        `📊 Color variants: ${Object.keys(extendedTheme.colors).length}`,
      );
    }
    if (extendedTheme.spacing) {
      console.log(
        `📐 Spacing values: ${Object.keys(extendedTheme.spacing).length}`,
      );
    }
    if (extendedTheme.fontSize) {
      console.log(
        `🔤 Font sizes: ${Object.keys(extendedTheme.fontSize).length}`,
      );
    }
  } catch (error) {
    console.error("❌ Error building tokens:", error);
    process.exit(1);
  }
}

// Run the build process
buildTokens();

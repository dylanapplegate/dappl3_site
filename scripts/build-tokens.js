#!/usr/bin/env node

/**
 * Build script to generate tokens.json from Tailwind config
 * This script extracts design tokens from tailwind.config.js and converts them
 * to a Style Dictionary compatible format for use with Figma Tokens Studio
 */

import { createRequire } from "module";
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
    };
  }

  // Handle fontFamily arrays
  if (key.includes("fontFamily") && Array.isArray(value)) {
    return {
      value: value.join(", "),
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

async function buildTokens() {
  try {
    console.log("🚀 Building tokens from Tailwind config...");

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

    console.log("✅ Tokens successfully generated at:", outputPath);
    console.log(
      `🎨 Generated tokens for: ${Object.keys(extendedTheme).join(", ")}`,
    );
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

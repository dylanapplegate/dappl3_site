import { test, expect } from "@playwright/test";

test.describe("Dark Mode Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage with default theme preference
    await page.goto("/");
  });

  test("should display all components correctly in light mode", async ({
    page,
  }) => {
    // Set light mode preference
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();
    await page.waitForTimeout(300);

    // Check that key elements are visible and styled correctly
    await expect(page.locator("h1")).toContainText("Welcome to My");
    await expect(page.locator(".btn-primary")).toBeVisible();
    await expect(page.locator(".btn-secondary")).toBeVisible();

    // Check that cards have light mode styling
    const cards = page.locator("article");
    if ((await cards.count()) > 0) {
      await expect(cards.first()).toHaveClass(/bg-white/);
    }

    // Take a screenshot for visual regression
    await page.screenshot({
      path: "test-results/homepage-light.png",
      fullPage: true,
    });
  });

  test("should display all components correctly in dark mode", async ({
    page,
  }) => {
    // Set dark mode preference
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();
    await page.waitForTimeout(300);

    // Check that key elements are visible and styled correctly
    await expect(page.locator("h1")).toContainText("Welcome to My");
    await expect(page.locator(".btn-primary")).toBeVisible();
    await expect(page.locator(".btn-secondary")).toBeVisible();

    // Check that cards have dark mode styling
    const cards = page.locator("article");
    if ((await cards.count()) > 0) {
      await expect(cards.first()).toHaveClass(/dark:bg-gray-800/);
    }

    // Take a screenshot for visual regression
    await page.screenshot({
      path: "test-results/homepage-dark.png",
      fullPage: true,
    });
  });

  test("should respect prefers-color-scheme setting", async ({ page }) => {
    // Test light mode preference
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();
    await page.waitForTimeout(300);

    // Verify we're in light mode
    await expect(page.locator("html")).not.toHaveClass("dark");

    // Test dark mode preference
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();
    await page.waitForTimeout(300);

    // Verify we're now in dark mode
    await expect(page.locator("html")).toHaveClass("dark");

    // Reset to no preference
    await page.emulateMedia({ colorScheme: "no-preference" });
    await page.reload();
    await page.waitForTimeout(300);

    // Should default to light mode when no preference
    await expect(page.locator("html")).not.toHaveClass("dark");
  });

  test("should maintain dark mode styling on blog pages", async ({ page }) => {
    // Set dark mode preference
    await page.emulateMedia({ colorScheme: "dark" });

    // Navigate to blog index
    await page.goto("/blog");
    await page.waitForTimeout(300);

    // Check dark mode styling is maintained
    await expect(page.locator("html")).toHaveClass("dark");
    await expect(page.locator("h1")).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: "test-results/blog-dark.png",
      fullPage: true,
    });
  });

  test("should maintain dark mode styling on project pages", async ({
    page,
  }) => {
    // Set dark mode preference
    await page.emulateMedia({ colorScheme: "dark" });

    // Navigate to projects index
    await page.goto("/projects");
    await page.waitForTimeout(300);

    // Check dark mode styling is maintained
    await expect(page.locator("html")).toHaveClass("dark");
    await expect(page.locator("h1")).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: "test-results/projects-dark.png",
      fullPage: true,
    });
  });

  test("should have proper contrast in both themes", async ({ page }) => {
    // Test light mode contrast
    await page.emulateMedia({ colorScheme: "light" });
    await page.reload();
    await page.waitForTimeout(300);

    const lightHeading = await page.locator("h1").first();
    const lightHeadingColor = await lightHeading.evaluate(
      (el) => getComputedStyle(el).color,
    );

    // Switch to dark mode
    await page.emulateMedia({ colorScheme: "dark" });
    await page.reload();
    await page.waitForTimeout(300);

    const darkHeading = await page.locator("h1").first();
    const darkHeadingColor = await darkHeading.evaluate(
      (el) => getComputedStyle(el).color,
    );

    // Colors should be different between themes
    expect(lightHeadingColor).not.toBe(darkHeadingColor);
  });
});

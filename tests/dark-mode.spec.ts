import { test, expect } from "@playwright/test";

test.describe("Dark Mode Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage
    await page.goto("/");
  });

  test("should display all components correctly in light mode", async ({
    page,
  }) => {
    // Ensure we're in light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
    });

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
    // Switch to dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
    });

    // Wait for dark mode transition
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

  test("should toggle between light and dark modes", async ({ page }) => {
    // Find the theme toggle button by aria-label
    const themeToggle = page.getByLabel("Toggle theme");

    // Check initial state (should be light mode by default)
    await expect(page.locator("html")).not.toHaveClass("dark");

    // Click theme toggle to switch to dark mode
    await themeToggle.click();
    await page.waitForTimeout(300); // Wait for transition

    // Verify we're now in dark mode
    await expect(page.locator("html")).toHaveClass("dark");

    // Click again to switch back to light mode
    await themeToggle.click();
    await page.waitForTimeout(300);

    // Verify we're back in light mode
    await expect(page.locator("html")).not.toHaveClass("dark");
  });

  test("should maintain dark mode styling on blog pages", async ({ page }) => {
    // Navigate to blog index first
    await page.goto("/blog");

    // Switch to dark mode using the theme toggle
    const themeToggle = page.getByLabel("Toggle theme");
    await themeToggle.click();
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
    // Navigate to projects index first
    await page.goto("/projects");

    // Switch to dark mode using the theme toggle
    const themeToggle = page.getByLabel("Toggle theme");
    await themeToggle.click();
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
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
    });

    const lightHeading = await page.locator("h1").first();
    const lightHeadingColor = await lightHeading.evaluate(
      (el) => getComputedStyle(el).color,
    );

    // Switch to dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(300);

    const darkHeading = await page.locator("h1").first();
    const darkHeadingColor = await darkHeading.evaluate(
      (el) => getComputedStyle(el).color,
    );

    // Colors should be different between themes
    expect(lightHeadingColor).not.toBe(darkHeadingColor);
  });
});

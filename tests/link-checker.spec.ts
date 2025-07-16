import { test, expect, type Page } from "@playwright/test";

/**
 * Comprehensive E2E Link Checker for Static Next.js Site
 *
 * This test crawls the entire site starting from the homepage and verifies:
 * - All internal links return successful status codes (2xx)
 * - No broken internal links exist
 * - Pages are accessible and properly rendered
 */

interface CrawlResult {
  url: string;
  statusCode: number;
  statusText: string;
  error?: string;
}

test.describe("Site Integrity", () => {
  test("Crawl site and check for broken links", async ({ page, request }) => {
    const baseUrl = "http://localhost:3001";
    const visitedUrls = new Set<string>();
    const urlQueue: string[] = ["/"];
    const results: CrawlResult[] = [];
    const brokenLinks: CrawlResult[] = [];

    console.log("🔍 Starting comprehensive site crawl...");

    while (urlQueue.length > 0) {
      const currentPath = urlQueue.shift()!;
      const fullUrl = `${baseUrl}${currentPath}`;

      // Skip if already visited
      if (visitedUrls.has(currentPath)) {
        continue;
      }

      visitedUrls.add(currentPath);
      console.log(`📄 Crawling: ${currentPath}`);

      try {
        // Navigate to the page
        const response = await page.goto(fullUrl, {
          waitUntil: "networkidle",
          timeout: 30000,
        });

        if (!response) {
          const result: CrawlResult = {
            url: currentPath,
            statusCode: 0,
            statusText: "No response",
            error: "Failed to get response",
          };
          results.push(result);
          brokenLinks.push(result);
          continue;
        }

        const statusCode = response.status();
        const statusText = response.statusText();

        const result: CrawlResult = {
          url: currentPath,
          statusCode,
          statusText,
        };

        results.push(result);

        // Check if the page loaded successfully
        if (statusCode >= 400) {
          result.error = `Page returned ${statusCode} ${statusText}`;
          brokenLinks.push(result);
          console.log(`❌ Broken page: ${currentPath} (${statusCode})`);
          continue;
        }

        // Wait for page to be fully loaded
        await page.waitForLoadState("networkidle");

        // Find all internal links on the current page
        const links = await page.locator("a").all();

        for (const link of links) {
          try {
            const href = await link.getAttribute("href");

            if (!href) continue;

            // Skip external links, mailto, tel, anchor links, and hash fragments
            if (
              href.startsWith("http") ||
              href.startsWith("mailto:") ||
              href.startsWith("tel:") ||
              href.startsWith("#") ||
              href.includes("#")
            ) {
              continue;
            }

            // Normalize the URL
            let normalizedUrl = href;

            // Handle relative URLs
            if (href.startsWith("./")) {
              normalizedUrl = href.substring(1);
            } else if (!href.startsWith("/")) {
              normalizedUrl = `/${href}`;
            }

            // Remove trailing slashes for consistency
            if (normalizedUrl !== "/" && normalizedUrl.endsWith("/")) {
              normalizedUrl = normalizedUrl.slice(0, -1);
            }

            // Test the link immediately
            console.log(`🔗 Testing link: ${normalizedUrl}`);

            try {
              const linkResponse = await request.get(
                `${baseUrl}${normalizedUrl}`,
              );
              const linkStatusCode = linkResponse.status();
              const linkStatusText = linkResponse.statusText();

              const linkResult: CrawlResult = {
                url: normalizedUrl,
                statusCode: linkStatusCode,
                statusText: linkStatusText,
              };

              // Check if link is broken
              if (linkStatusCode >= 400) {
                linkResult.error = `Link returned ${linkStatusCode} ${linkStatusText}`;
                brokenLinks.push(linkResult);
                console.log(
                  `❌ Broken link found: ${normalizedUrl} (${linkStatusCode})`,
                );
              } else {
                console.log(`✅ Link OK: ${normalizedUrl} (${linkStatusCode})`);
              }

              // Add to crawl queue if it's a new internal URL and responds successfully
              if (
                !visitedUrls.has(normalizedUrl) &&
                !urlQueue.includes(normalizedUrl) &&
                linkStatusCode < 400
              ) {
                urlQueue.push(normalizedUrl);
              }
            } catch (linkError) {
              const linkResult: CrawlResult = {
                url: normalizedUrl,
                statusCode: 0,
                statusText: "Request failed",
                error: `Request error: ${linkError}`,
              };
              brokenLinks.push(linkResult);
              console.log(
                `❌ Link request failed: ${normalizedUrl} - ${linkError}`,
              );
            }
          } catch (linkProcessingError) {
            console.log(`⚠️ Error processing link: ${linkProcessingError}`);
          }
        }
      } catch (pageError) {
        const result: CrawlResult = {
          url: currentPath,
          statusCode: 0,
          statusText: "Page load failed",
          error: `Page error: ${pageError}`,
        };
        results.push(result);
        brokenLinks.push(result);
        console.log(`❌ Failed to load page: ${currentPath} - ${pageError}`);
      }
    }

    // Report results
    console.log(`\n📊 Crawl Summary:`);
    console.log(`- Total pages crawled: ${visitedUrls.size}`);
    console.log(`- Total links tested: ${results.length}`);
    console.log(`- Broken links found: ${brokenLinks.length}`);

    if (brokenLinks.length > 0) {
      console.log(`\n❌ Broken Links Details:`);
      brokenLinks.forEach((link) => {
        console.log(
          `  - ${link.url}: ${link.statusCode} ${link.statusText} ${
            link.error ? `(${link.error})` : ""
          }`,
        );
      });
    }

    // Assert that no broken links were found
    expect(
      brokenLinks.length,
      `Found ${brokenLinks.length} broken links:\n${brokenLinks
        .map(
          (link) =>
            `  - ${link.url}: ${link.statusCode} ${link.statusText} ${
              link.error ? `(${link.error})` : ""
            }`,
        )
        .join("\n")}`,
    ).toBe(0);

    console.log("✅ All links are working correctly!");
  });

  test("Verify homepage loads correctly", async ({ page }) => {
    await page.goto("/");

    // Wait for the page to load completely
    await page.waitForLoadState("networkidle");

    // Check that the page has loaded by looking for expected elements
    await expect(page.locator("body")).toBeVisible();

    // Check for common layout elements
    const header = page.locator('header, nav, [role="banner"]');
    const main = page.locator('main, [role="main"]');

    // At least one of these should be present
    const hasHeader = (await header.count()) > 0;
    const hasMain = (await main.count()) > 0;

    expect(
      hasHeader || hasMain,
      "Page should have header/nav or main content area",
    ).toBe(true);

    console.log("✅ Homepage loads correctly");
  });

  test("Verify all critical pages are accessible", async ({
    page,
    request,
  }) => {
    const criticalPaths = ["/", "/about", "/blog", "/projects"];

    for (const path of criticalPaths) {
      console.log(`🔍 Testing critical path: ${path}`);

      const response = await request.get(`http://localhost:3001${path}`);
      expect(
        response.status(),
        `Critical path ${path} should be accessible`,
      ).toBeLessThan(400);

      // Also test that the page renders in the browser
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("body")).toBeVisible();

      console.log(`✅ Critical path OK: ${path}`);
    }
  });
});

# Playwright E2E Link Checker Setup

## Overview

This document outlines the comprehensive Playwright E2E testing setup that has been added to your Next.js static blog project. The primary purpose is to automatically crawl the built static site and verify that all internal links are working correctly.

## What Was Implemented

### 1. Playwright Configuration (`playwright.config.ts`)
- **Web Server Integration**: Automatically builds and serves the static site before running tests
- **Multi-Browser Testing**: Configured for Chromium, Firefox, and WebKit
- **Static File Serving**: Uses `http-server` to serve the `/out` directory on port 3001
- **CI/CD Ready**: Optimized settings for both local development and CI environments

### 2. Comprehensive Link Checker (`tests/link-checker.spec.ts`)
- **Intelligent Crawling**: Starts from the homepage and discovers all internal pages
- **Link Validation**: Tests every internal link for 404 errors and other failures
- **Smart Filtering**: Skips external links, mailto, tel, and anchor-only links
- **Detailed Reporting**: Provides comprehensive logging and error reporting
- **Multiple Test Scenarios**: 
  - Full site crawl with link validation
  - Homepage load verification  
  - Critical path accessibility testing

### 3. Package Scripts
- `npm run test:e2e` - Run all E2E tests
- `npm run test:e2e:ui` - Run tests with Playwright UI
- `npm run test:e2e:debug` - Debug mode for test development

### 4. Dependencies
- `@playwright/test` - Core testing framework
- `http-server` - Static file server for testing

## Configuration Features

### Environment-Aware Settings
The Playwright configuration automatically adapts based on environment:

```typescript
// Headless mode: enabled in CI, disabled locally
headless: !!process.env.CI

// Reporter: GitHub/List for CI, HTML for development  
reporter: process.env.CI ? [['list'], ['json', { outputFile: 'test-results.json' }]] : 'html'

// Workers: Single worker in CI for stability, parallel locally
workers: process.env.CI ? 1 : undefined

// Retries: 2 retries in CI, 0 locally for faster feedback
retries: process.env.CI ? 2 : 0
```

### Multiple Test Scripts
- `test:e2e` - Development mode with visual feedback
- `test:e2e:ci` - Headless mode for CI-like testing locally  
- `test:e2e:github` - GitHub Actions optimized
- `test:e2e:ui` - Interactive UI mode for debugging
- `test:e2e:debug` - Step-by-step debugging mode

## How It Works

1. **Build Phase**: The test runner executes `npm run build` to generate static files in `/out`
2. **Serve Phase**: `http-server` serves the static files on `localhost:3001`
3. **Crawl Phase**: The test starts at the homepage and discovers all internal links
4. **Validation Phase**: Each discovered link is tested for accessibility (no 404s)
5. **Reporting Phase**: Comprehensive results showing all tested links and any failures

## Test Features

### Smart Link Discovery
- Automatically discovers new pages by following internal links
- Prevents infinite loops by tracking visited URLs
- Handles relative and absolute internal URLs correctly

### Comprehensive Validation
- Tests HTTP status codes (expects 2xx responses)
- Validates page rendering in actual browsers
- Checks critical application routes (`/`, `/about`, `/blog`, `/projects`)

### Detailed Error Reporting
- Shows exact URLs that are broken
- Displays HTTP status codes and error messages
- Provides clear failure context for debugging

## Usage

### Running Tests
```bash
# Development: Run with HTML report (opens in browser on failure)
npm run test:e2e

# Development with UI: Interactive testing mode
npm run test:e2e:ui

# Development debugging: Step-by-step debugging
npm run test:e2e:debug

# CI/Local headless: Runs in headless mode with list reporter
npm run test:e2e:ci

# GitHub Actions: Optimized for GitHub CI with GitHub reporter
npm run test:e2e:github
```

### Viewing Results
- Console output shows real-time crawling progress
- HTML report generated automatically (`npx playwright show-report`)
- Failed tests include detailed error context

### CI/CD Integration
The setup includes multiple modes for different environments:

#### Development Mode (`npm run test:e2e`)
- **Browser Windows**: Opens browser windows for visual feedback
- **Reporter**: HTML report that opens automatically on completion
- **Headless**: No (shows browser UI)
- **Best for**: Local development and debugging

#### CI Mode (`npm run test:e2e:ci`)
- **Browser Windows**: Runs in headless mode (no browser windows)
- **Reporter**: List reporter with console output only
- **Environment**: Sets `CI=true` automatically
- **Best for**: Local testing in CI-like conditions

#### GitHub Actions Mode (`npm run test:e2e:github`)
- **Browser Windows**: Runs in headless mode (controlled by CI env var)
- **Reporter**: GitHub-specific reporter with annotations
- **Environment**: Uses GitHub CI environment detection
- **Best for**: GitHub Actions workflows

All modes are fully compatible with CI/CD pipelines:
- No manual intervention required
- Fails fast on broken links
- Generates appropriate reports for the environment

## Benefits

1. **Automated Quality Assurance**: Catches broken links before deployment
2. **Comprehensive Coverage**: Tests the entire site automatically
3. **Multi-Browser Validation**: Ensures compatibility across different browsers
4. **Developer Friendly**: Clear error messages and easy local testing
5. **CI/CD Ready**: Perfect for automated deployment pipelines

## Verification

The link checker has been tested and verified to:
- ✅ Pass when all links are working correctly
- ✅ Fail and report specific broken links when issues exist
- ✅ Handle all page types (blog posts, projects, static pages)
- ✅ Work across multiple browsers (Chromium, Firefox, WebKit)
- ✅ Provide clear, actionable error messages

## Maintenance

- Tests run automatically on the built static site
- No maintenance required for basic functionality
- Easy to extend for additional test scenarios
- Configuration can be customized in `playwright.config.ts`

This E2E testing setup ensures your static blog maintains high quality and all links remain functional as content is added or modified.

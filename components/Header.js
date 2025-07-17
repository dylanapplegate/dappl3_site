import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="container max-w-4xl px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 transition-colors dark:text-white hover:text-pink-500 dark:hover:text-pink-400"
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="24"
              height="24"
            >
              <path
                d="M12 2.4c4.8 0 4.8 4.8 0 9.6 -4.8 -4.8 -4.8 -9.6 0 -9.6"
                fill="#EC4899"
              />
              <path
                d="M21.6 12c0 4.8 -4.8 4.8 -9.6 0 4.8 -4.8 9.6 -4.8 9.6 0m-9.6 9.6c-4.8 0 -4.8 -4.8 0 -9.6 4.8 4.8 4.8 9.6 0 9.6m-9.6 -9.6c0 -4.8 4.8 -4.8 9.6 0 -4.8 4.8 -9.6 4.8 -9.6 0"
                fill="#8B5CF6"
              />
              <path
                cx="100"
                cy="100"
                r="12"
                fill="#fff"
                d="M13.44 12A1.44 1.44 0 0 1 12 13.44A1.44 1.44 0 0 1 10.56 12A1.44 1.44 0 0 1 13.44 12z"
              />
            </svg>
            <div>dappl3</div>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      mobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Navigation */}
          <nav className="items-center hidden space-x-8 md:flex">
            <Link
              href="/about"
              className="text-gray-700 transition-colors dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 transition-colors dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="text-gray-700 transition-colors dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
            >
              Projects
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="pb-4 md:hidden">
            <div className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="py-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="py-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/projects"
                className="py-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

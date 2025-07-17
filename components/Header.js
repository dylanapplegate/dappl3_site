import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ensure component is mounted before rendering theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="container max-w-4xl px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 transition-colors dark:text-white hover:text-pink-500 dark:hover:text-pink-400"
          >
            dappl3
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

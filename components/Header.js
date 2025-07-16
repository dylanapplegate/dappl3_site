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

          {/* Theme Toggle */}
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

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-gray-700 transition-colors bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            )}
          </div>
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

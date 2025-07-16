import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({
  children,
  title,
  description,
  type = "website",
}) {
  const siteTitle = "Developer Blog & Portfolio";
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription =
    description || "A modern developer blog and portfolio built with Next.js";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content={type} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    const previousTitle = document.title;
    const descEl = document.querySelector('meta[name="description"]');
    const previousDesc = descEl?.getAttribute("content") ?? "";
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    const previousOgTitle = ogTitleEl?.getAttribute("content") ?? "";
    const ogDescEl = document.querySelector('meta[property="og:description"]');
    const previousOgDesc = ogDescEl?.getAttribute("content") ?? "";

    document.title = "Page not found — El Kiosk";
    descEl?.setAttribute(
      "content",
      "The page you're looking for doesn't exist. Return to the El Kiosk homepage to explore automated monthly content for your brand.",
    );
    ogTitleEl?.setAttribute("content", "Page not found — El Kiosk");
    ogDescEl?.setAttribute(
      "content",
      "The page you're looking for doesn't exist. Return to the El Kiosk homepage.",
    );

    return () => {
      document.title = previousTitle;
      descEl?.setAttribute("content", previousDesc);
      ogTitleEl?.setAttribute("content", previousOgTitle);
      ogDescEl?.setAttribute("content", previousOgDesc);
    };
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </main>
  );
};

export default NotFound;

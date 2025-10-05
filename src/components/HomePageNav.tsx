import { useState, useEffect } from "react";

const sections = [
  { id: "new-arrivals", title: "New Arrivals" },
  { id: "collections", title: "Collections" },
  { id: "featured-products", title: "Featured" },
  { id: "festive-specials", title: "Festive" },
  { id: "trending-products", title: "Trending" },
];

const HomePageNav = ({
  sentinelRef,
}: {
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("new-arrivals");

  // State to track if the screen is large (lg breakpoint: 1024px)
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  // Effect to update screen size state on resize
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleScreenChange = () => setIsLargeScreen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleScreenChange);
    return () => mediaQuery.removeEventListener("change", handleScreenChange);
  }, []);

  // Sticky state logic
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { rootMargin: "-56px 0px 0px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelRef]);

  // Active section tracking logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // --- CHANGES ARE HERE ---
  // The className logic is updated for responsive stickiness and opaque background
  return (
    <div
      className={`z-30 ${
        isSticky && !isLargeScreen
          ? "sticky top-14 bg-white shadow-sm"
          : "relative bg-white"
      }`}
    >
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-1 sm:px-1">
          <div className="flex justify-start md:justify-center items-center space-x-3 md:space-x-6 lg:space-x-8 py-3 overflow-x-auto scrollbar-hide">
            {sections.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleLinkClick(e, id)}
                className={`flex-shrink-0 text-sm font-medium py-1.5 px-4 rounded-full transition-colors duration-300 ${
                  activeSection === id
                    ? "bg-slate-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                }`}
              >
                {title}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomePageNav;

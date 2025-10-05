import { useState, useEffect, useRef } from "react";

const sections = [
  { id: "new-arrivals", title: "New Arrivals" },
  { id: "collections", title: "Collections" },
  { id: "featured-products", title: "Featured" },
  { id: "festive-specials", title: "Festive" },
  { id: "trending-products", title: "Trending" },
];

const HomePageNav = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("new-arrivals");
  const navRef = useRef<HTMLDivElement>(null);

  // Effect for handling the sticky state
  useEffect(() => {
    const navElement = navRef.current;
    if (!navElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the top of the nav is no longer visible, make it sticky
        setIsSticky(entry.intersectionRatio < 1);
      },
      { threshold: [1], rootMargin: "-69px 0px 0px 0px" } // trigger when the top 69px (navbar height) is scrolled past
    );

    observer.observe(navElement);
    return () => observer.disconnect();
  }, []);

  // Effect for tracking the active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" } // Highlights when the section is in the middle of the screen
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
        top: element.offsetTop - 80, // Adjust offset for sticky nav height
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={navRef}
      className={`top-0 z-30 transition-shadow ${
        isSticky ? "sticky bg-white/80 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- CHANGE IS HERE --- */}
          <div className="flex justify-center items-center space-x-2 sm:space-x-3 py-3 overflow-x-auto scrollbar-hide">
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

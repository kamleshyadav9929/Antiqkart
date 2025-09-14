import React, { useEffect, useState, lazy, Suspense } from "react";

// Dynamically import the globe
const InteractiveGlobe = lazy(() => import("./InteractiveGlobe"));

// This is a special wrapper component. It will only render its children
// after it has successfully mounted in the browser.
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Don't render anything on the server or during the initial render.
  }

  return <>{children}</>;
};

const GlobeFallback = () => (
  <div className="flex justify-center items-center h-[500px] md:h-[700px]">
    <div className="text-center">
      <h2 className="text-xl font-serif text-muted">
        Loading Interactive Map...
      </h2>
    </div>
  </div>
);

const ClientOnlyGlobe = () => {
  return (
    <ClientOnly>
      <Suspense fallback={<GlobeFallback />}>
        <InteractiveGlobe />
      </Suspense>
    </ClientOnly>
  );
};

export default ClientOnlyGlobe;

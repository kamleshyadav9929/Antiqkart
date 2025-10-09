import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    // Reduced padding on small screens (px-2)
    <div className="w-full max-w-full px-2 sm:px-6 lg:px-3">{children}</div>
  );
};

export default Layout;

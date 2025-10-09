import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-full px-4 sm:px-1 lg:px-8">{children}</div>
  );
};

export default Layout;

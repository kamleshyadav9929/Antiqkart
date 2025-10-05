import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-1 sm:px-1 lg:px-6">
      {children}
    </div>
  );
};

export default Layout;

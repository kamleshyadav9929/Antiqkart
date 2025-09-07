import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Layout;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: JSX.Element;
  hideHeader?: boolean;
  hideFooter?: boolean;
  padding?: string;
};

const Layout: React.FC<Props> = ({
  children,
  hideHeader,
  hideFooter,
  padding,
}) => {
  return (
    <div className="flex flex-col items-center h-screen">
      {!hideHeader && <Header />}
      <main
        className={`flex flex-col flex-grow items-center bg-purple-100 shadow-inner w-screen h-full ${padding}`}
      >
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;

import Header from "./Header";
import Footer from "./Footer";
import { virgil } from "y/utils/consts";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // <main className={`${GeistSans.variable} ${virgil.variable} font-sans`}>
    <main className={`${GeistMono.variable} ${virgil.variable} font-mono`}>
      <div className="grid grid-rows-[80px_minmax(calc(100vh-160px),_1fr)_80px]">
        <Header />
        <main className="align-center flex w-full justify-center bg-gray-100 ">
          {children}
        </main>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;

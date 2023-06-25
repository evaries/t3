import Header from "./Header";
import Footer from "./Footer";
import { virgil } from "y/utils/consts";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className={`${virgil.variable} font-sans`}>
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

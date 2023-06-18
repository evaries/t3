import localFont from "@next/font/local";

const virgil = localFont({
  src: [
    {
      path: "../../public/fonts/Virgil.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/Virgil.woff2",
      weight: "700",
    },
  ],
  variable: "--font-virgil",
});

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className={`${virgil.variable} font-sans`}>
      <div className="grid grid-rows-[80px_minmax(calc(100vh-160px),_1fr)_80px]">
        <main className="align-center flex w-full justify-center bg-gray-100 ">
          {children}
        </main>
      </div>
    </main>
  );
};

export default PublicLayout;

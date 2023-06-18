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
  return <main className={`${virgil.variable} font-sans`}>{children}</main>;
};

export default PublicLayout;

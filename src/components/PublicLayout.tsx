import { virgil } from "y/utils/consts.tsx";
import { Toaster } from "./ui/toaster";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className={`${virgil.variable} font-sans`}>
      {children}
      <Toaster />
    </main>
  );
};

export default PublicLayout;

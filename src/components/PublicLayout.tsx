import { virgil } from "y/utils/consts";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <main className={`${virgil.variable} font-sans`}>{children}</main>;
};

export default PublicLayout;

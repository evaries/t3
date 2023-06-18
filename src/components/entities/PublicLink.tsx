import { NextPage } from "next";
import Link from "next/link";

export type PublicLinkProps = {
  name: string;
  href: string;
};

const PublicLink: NextPage<PublicLinkProps> = ({ name, href }) => {
  return (
    <div className="centered h-30 max-w-xs">
      <Link href={href} target="_blank" passHref={true}>
        <div className="mt-2 flex inline-flex w-80 w-full items-center justify-center rounded-lg bg-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none dark:focus:ring-gray-500">
          {name}
        </div>
      </Link>
    </div>
  );
};

export default PublicLink;

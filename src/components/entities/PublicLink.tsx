import type { NextPage } from "next";
import Link from "next/link";
import ShareIconLinks from "../shared/ShareIconLinks";
import toast from "react-simple-toasts";
import { virgil } from "y/utils/consts";

export type PublicLinkProps = {
  name: string;
  href: string;
};

const PublicLink: NextPage<PublicLinkProps> = ({ name, href }) => {
  return (
    <div className="centered h-30 w-full max-w-xs">
      <Link href={href} target="_blank" passHref={true} className="w-full">
        <div className="relative mt-2 inline-flex w-80 w-full items-center justify-center rounded-lg bg-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none dark:focus:ring-gray-500">
          {name}
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toast("Link copied!", {
                className: `${virgil.variable} font-sans`,
              });
            }}
            className="absolute right-5 "
          >
            <ShareIconLinks />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PublicLink;

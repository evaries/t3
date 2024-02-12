import type { NextPage } from "next";
import Link from "next/link";
import { copyToClipboard } from "y/utils/utils";
import ShareIconLinks from "../shared/icons/ShareLinks";
import { useToast } from "../ui/use-toast";

export type PublicLinkProps = {
  name: string;
  href: string;
};

const PublicLink: NextPage<PublicLinkProps> = ({ name, href }) => {
  const { toast } = useToast();
  return (
    <div className="centered h-30 w-full">
      <Link href={href} target="_blank" passHref={true} className="w-full">
        <div className="relative mt-2 inline-flex w-full items-center justify-center rounded-lg border-2	border-gray-900 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none dark:focus:ring-gray-500">
          {name}
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toast({
                description: "Link copied!",
              });
              copyToClipboard(href);
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

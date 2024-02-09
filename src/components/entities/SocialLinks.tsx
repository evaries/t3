import { Link } from "@prisma/client";
import Twitter from "../shared/icons/Twitter";
import { SocialSelectItemsType } from "./SocialDialog";
import Instagram from "../shared/icons/Instagram";

const icons: Record<SocialSelectItemsType, React.JSX.Element> = {
  twitter: <Twitter />,
  instagram: <Instagram />,
};

export type SocialLinksProps = { links: Link[] };

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex gap-3">
      {links.map((link) => {
        return (
          <a href={link.to} target="_blank">
            {icons[link.name as SocialSelectItemsType]}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;

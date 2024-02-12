import { Link } from "@prisma/client";
import { SocialSelectItemsType } from "./SocialDialog";
import { socialIcons } from "y/utils/consts.tsx";
import { Loader, X } from "lucide-react";
import { api } from "y/utils/api";

export type SocialLinksProps = { links: Link[]; removable?: boolean };

const SocialLinks: React.FC<SocialLinksProps> = ({ links, removable }) => {
  if (removable) {
    const ctx = api.useContext();

    const { mutate, isLoading } = api.link.deleteLink.useMutation({
      onSuccess: async () => {
        await ctx.link.getUserSocialLinks.invalidate();
      },
    });

    const deleteSocial = (id: string) => {
      mutate({ id });
    };

    return (
      <div className="flex justify-center gap-3 py-3">
        {!isLoading ?
          links.map((link: Link) => {
            return (
              <div
                key={link.id}
                onClick={() => deleteSocial(link.id)}
                className="group relative"
              >
                <div className=" invisible absolute h-8 w-8 cursor-pointer bg-gray-100 group-hover:visible">
                  <X className="absolute bottom-0 left-0 right-0 top-0 m-auto group-hover:visible" />
                </div>
                {socialIcons[link.name as SocialSelectItemsType]}
              </div>
            );
          })
          : <Loader />}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 py-3">
      {links.map((link) => {
        return (
          <a href={"https://" + link.to} target="_blank" key={link.id}>
            {socialIcons[link.name as SocialSelectItemsType]}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;

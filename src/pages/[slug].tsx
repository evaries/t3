import type { NextPage } from "next";
import { useRouter } from "next/router";
import PublicLink from "y/components/entities/PublicLink";
import SocialLinks from "y/components/entities/SocialLinks";
import ShareIconBox from "y/components/shared/icons/ShareBox";
import { UserAvatar } from "y/components/shared/UserLogo";
import { useToast } from "y/components/ui/use-toast";
import { api } from "y/utils/api";
import { copyToClipboard } from "y/utils/utils";

export type NextPageWithLayout = NextPage & {
  Layout?: string;
};

const PublicPage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const slug = router.query.slug;

  if (!slug) return <></>;

  if (Array.isArray(slug)) return <div>slug</div>;

  const { toast } = useToast();
  const { data: user, isLoading } = api.user.getUserByUsername.useQuery({
    id: slug,
  });

  if (isLoading) return <div className="centered h-screen">Loading...</div>;

  if (!user) {
    return (
      <div className="centered h-screen">
        <div>Username does not exist</div>
      </div>
    );
  }

  const socialLinks = user.links.filter((link) => link.isSocialMedia);

  return (
    <div className="centered h-screen">
      <div className="relative w-[34rem] px-3">
        <UserAvatar username={user.username} />
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            copyToClipboard(window.location.href);
            toast({
              description: "Link copied!",
            });
          }}
          className="absolute right-[0.75rem] top-0"
        >
          <ShareIconBox />
        </div>
        <span className="my-2 flex justify-center font-semibold">
          {`@${user.username}`}
        </span>
        <p className={"my-2 flex justify-center text-center"}>{user.bio}</p>
        {socialLinks.length ? <SocialLinks links={socialLinks} /> : null}
        {user.links
          .filter((link) => link.isActive)
          .map((link) => (
            <PublicLink href={link.to} name={link.name} key={link.id} />
          ))}
      </div>
    </div>
  );
};

export default PublicPage;

PublicPage.Layout = "public";

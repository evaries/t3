import type { NextPage } from "next";
import PublicLink from "y/components/entities/PublicLink";
import { UserAvatar } from "y/components/shared/UserLogo";
import { api } from "y/utils/api";
import { useRouter } from "next/router";
import ShareIconBox from "y/components/shared/ShareIconBox";
import { copyToClipboard } from "y/utils/utils";
import { useToast } from "y/components/ui/use-toast";

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

  if (!user)
    return (
      <div className="centered h-screen">
        <div>Username does not exist</div>
      </div>
    );

  return (
    <div className="centered h-screen">
      <div className="relative w-80">
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
          className="absolute right-0 top-0"
        >
          <ShareIconBox />
        </div>
        <div className="my-2 flex justify-center font-semibold">{`@${user.username}`}</div>
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

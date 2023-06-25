import type { NextPage } from "next";
import PublicLink from "y/components/entities/PublicLink";
import { UserAvatar } from "y/components/shared/UserLogo";
import { api } from "y/utils/api";
import { useRouter } from "next/router";
import ShareIconBox from "y/components/shared/ShareIconBox";
import toast from "react-simple-toasts";
import { virgil } from "y/utils/consts";

export type NextPageWithLayout = NextPage & {
  Layout?: string;
};

const PublicPage: NextPageWithLayout = () => {
  const router = useRouter();
  const slug = router.query.slug;
  //TODO: add handlers here
  if (!slug) return <div>slug</div>;
  if (Array.isArray(slug)) return <div>slug</div>;
  const { data: user, isLoading } = api.user.getUserByUsername.useQuery({
    id: slug,
  });

  if (isLoading) return <div className="centered">Loading...</div>;

  if (!user)
    return (
      <div className="centered">
        <div>Username does not exist</div>
      </div>
    );
  //TODO: find more elegant way to deal with prisma's json
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const avatar = JSON.parse(JSON.stringify(user.attributes))
    .image_url as string;
  return (
    <div className="centered h-screen">
      <div className="relative w-80">
        <UserAvatar url={avatar} />
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toast("Profile copied!", {
              className: `${virgil.variable} font-sans`,
            });
          }}
          className="absolute right-0 top-0"
        >
          <ShareIconBox />
        </div>
        <div className="my-2 flex justify-center">{`@${user.username}`}</div>
        {user.Link.filter((link) => link.isActive).map((link) => (
          <PublicLink href={link.to} name={link.name} key={link.id} />
        ))}
      </div>
    </div>
  );
};

export default PublicPage;

PublicPage.Layout = "public";

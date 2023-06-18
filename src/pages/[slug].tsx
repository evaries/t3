import type { GetServerSideProps, NextPage } from "next";
import PublicLink from "y/components/entities/PublicLink";
import { UserAvatar } from "y/components/shared/UserLogo";
import { api } from "y/utils/api";

const UserLink: NextPage<{ slug: string | string[] | undefined }> = ({
  slug,
}) => {
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
    <div className="centered">
      <div>
        <UserAvatar url={avatar} />
        <div className="my-2 flex justify-center">{`@${user.username}`}</div>
        {user.Link.map((link) => (
          <PublicLink href={link.to} name={link.name} key={link.id} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  slug: string | string[] | undefined;
}> = async (ctx) => {
  const slug = ctx.params!.slug;
  await Promise.resolve(true);
  return {
    props: {
      slug,
    },
  };
};

export default UserLink;

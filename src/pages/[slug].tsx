import type { GetServerSideProps, NextPage } from "next";
import { api } from "y/utils/api";
import PublicProfile from "y/components/widgets/PublicProfile";

const UserLink: NextPage<{ slug: string | string[] | undefined }> = ({
  slug,
}) => {
  //TODO: add handlers here
  if (!slug) return <div>slug</div>;
  if (Array.isArray(slug)) return <div>slug</div>;
  const { data, isLoading } = api.post.getPublicPostByUsername.useQuery({
    username: slug,
  });

  if (isLoading) return (
    <div className="centered">
      Loading...
    </div>
  )

  if (!data || data.length === 0) return (
    <div className="centered">
      <div>Username does not exist</div>
    </div>
  )

  return (
    <div className="centered">
      {isLoading && <div>Loading...</div>}
      <PublicProfile data={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  slug: string | string[] | undefined;
}> = async ctx => {
  const slug = ctx.params!.slug;
  await Promise.resolve(true);
  return {
    props: {
      slug,
    },
  };
};

export default UserLink;

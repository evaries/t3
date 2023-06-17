import type { GetServerSideProps, NextPage } from "next";

const UserLink: NextPage<{ slug: string | string[] | undefined }> = ({
  slug,
}) => {
  //TODO: add handlers here
  if (!slug) return <div>slug</div>;
  if (Array.isArray(slug)) return <div>slug</div>;
  const isLoading = false;

  if (isLoading) return <div className="centered">Loading...</div>;

  // if ()
  //   return (
  //     <div className="centered">
  //       <div>Username does not exist</div>
  //     </div>
  //   );

  return <div className="centered">{isLoading && <div>Loading...</div>}</div>;
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

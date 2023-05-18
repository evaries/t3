import { GetServerSideProps, NextPage } from "next";
import { api } from "y/utils/api";

const UserLink: NextPage<{ slug: string | string[] | undefined }> = ({ slug }) => {
  //TODO: add handlers here
  if (!slug) return (<div>slug</div>)
  if (Array.isArray(slug)) return (<div>slug</div>)
  const { data } = api.post.getPublicPostByUsername.useQuery({ username: slug })

  return (
    <>
      {data && data.map(post => <div key={post.id} >{post.content}</div>)}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ slug: string | string[] | undefined }> = async (context) => {
  const slug = context.params!.slug
  await Promise.resolve(true)
  return {
    props: {
      slug
    },
  };
}

export default UserLink

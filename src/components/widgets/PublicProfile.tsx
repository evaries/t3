import { NextPage } from "next"
import PublicLink from "../entities/PublicLink"
import { Post } from "@prisma/client"
import { useUser } from "@clerk/nextjs"

export type PublicProfileProps = {
  data: Post[]
}
const PublicProfile: NextPage<PublicProfileProps> = ({ data }) => {

  return (
    <div className="centered flex-col " >
      <UserLogo />
      <Username />
      {data.map(post => <PublicLink key={post.id} text={post.content} />)}
    </div>
  )
}

const UserLogo = () => {
  const { user } = useUser();
  return (
    <div className="centered mb-5 max-h-100px "  >
      <img className="w-10 h-10 rounded-full"
        src={user?.profileImageUrl} alt="Rounded avatar" />
    </div>
  )

}

const Username = () => {
  const { user } = useUser();
  return (
    <div className="centered mb-5 max-h-100px "  >
      {`@${String(user?.unsafeMetadata.username)}`}
    </div>
  )
}

export default PublicProfile

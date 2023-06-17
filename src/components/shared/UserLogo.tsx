import { useUser } from "@clerk/nextjs";
export const UserLogo = () => {
  const { user } = useUser();
  return (
    <div className="centered mb-5 max-h-100px "  >
      <img className="w-10 h-10 rounded-full"
        src={user?.profileImageUrl} alt="Rounded avatar" />
    </div>
  )

}

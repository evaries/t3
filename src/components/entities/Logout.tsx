import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";

const Logout = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div
      onClick={() => {
        void signOut();
        void router.push("/");
      }}
    >
      <div className="cursor-pointer">
        {" "}
        Log out <span aria-hidden="true">&rarr;</span>
      </div>
    </div>
  );
};

export default Logout

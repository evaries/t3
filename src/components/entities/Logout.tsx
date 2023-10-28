import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Logout = () => {
  return (
    <div onClick={() => signOut({ callbackUrl: "/" })}>
      <div className="cursor-pointer">
        {" "}
        Logout <span aria-hidden="true">&rarr;</span>
      </div>
    </div>
  );
};

export default Logout;

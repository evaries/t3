import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <div onClick={() => void signOut({ callbackUrl: "/" })}>
      <div className="cursor-pointer">
        {" "}
        Logout <span aria-hidden="true">&rarr;</span>
      </div>
    </div>
  );
};

export default Logout;

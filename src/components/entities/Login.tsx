import { signIn } from "next-auth/react";
const Login: React.FC = () => {
  return (
    <button
      onClick={() => void signIn("google", { callbackUrl: "/dashboard" })}
    >
      Login <span aria-hidden="true">&rarr;</span>
    </button>
  );
};
export default Login;

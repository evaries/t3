import Link from "next/link";
const Login: React.FC = () => {
  return (
    <Link
      href="/auth/signin"
    >
      Login <span aria-hidden="true">&rarr;</span>
    </Link>
  );
};
export default Login;

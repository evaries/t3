import { SignInButton } from "@clerk/clerk-react";
const Login = () => {
  return (
    <SignInButton redirectUrl="/dashboard">
      <div className="cursor-pointer">
        Log in <span aria-hidden="true">&rarr;</span>
      </div>
    </SignInButton>
  );
};
export default Login;

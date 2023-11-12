import { getCsrfToken } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { signIn } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";

export type SignInProps = {
  csrfToken: string | undefined;
  username: string | undefined;
}

const SignIn: React.FC<SignInProps> = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log('csrfToken', csrfToken)
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <div className="mx-4 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-24 text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>
        <div className="mt-8 rounded-lg bg-white px-4 py-8 shadow-lg sm:px-10">
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50"
              onClick={() => void signIn("google", { callbackUrl: '/dashboard' })}
            >
              <svg
                className="-ml-1 mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
          <div className=" my-6 flex justify-center">------ or ------</div>
          <form method="post" action="/api/auth/signin/email">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken ? String(csrfToken) : ''} />
            <label className="block text-sm font-semibold text-gray-900">
              Email address
              <input
                className="mt-2 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                type="text"
                id="email"
                name="email"
                placeholder="email@mail.com"
              />
            </label>
            <button
              className="mt-2 flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="submit"
            >
              Sign in with Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      csrfToken: await getCsrfToken(ctx),
    },
  };
};


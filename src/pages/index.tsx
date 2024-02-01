import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { api } from "y/utils/api";
import Landing from "y/components/pages/Landing";
import { useSession } from "next-auth/react";
import { Button } from "y/components/ui/button";

const Home: NextPage = () => {
  const { push } = useRouter();
  const { status } = useSession();
  const isAuth = status === "authenticated";
  const isLoading = status === "loading";
  const { data } = api.user.getCurrentUser.useQuery();

  if (isLoading) {
    return (
      <main className="flex h-full w-full items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!isAuth)
    return (
      <main className="flex h-full w-full items-center justify-center">
        <Landing />
      </main>
    );

  return (
    <>
      <Head>
        <title>share links</title>
        <meta name="description" content="share links" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center ">
          <div>Hello {data?.name}! Looks great today!</div>
          <div className="mt-3 flex gap-5">
            <Button
              variant={"default"}
              onClick={(e) => {
                void e.preventDefault();
                void push("/dashboard");
              }}
            >
              go to dashboard
            </Button>
            <Button
              variant={"default"}
              onClick={(e) => {
                void e.preventDefault();
                void push(data ? `/${data?.username}` : "");
              }}
            >
              see public page
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { api } from "y/utils/api";

const Home: NextPage = () => {
  const { isSignedIn, user } = useUser();
  const { push } = useRouter();
  const { data } = api.user.getCurrentUser.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full w-full items-center justify-center">
        {/*TODO:separate this into components*/}
        {!isSignedIn ? (
          <div>Here will be landing page for non auth state</div>
        ) : (
          <div className="flex flex-col items-center ">
            <div>Hello {user.firstName}! Looks great today!</div>
            <div className="mt-3 flex ">
              <button
                onClick={(e) => {
                  void e.preventDefault();
                  void push("/dashboard");
                }}
                className="mx-2 rounded-md	 bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
              >
                go to dashboard
              </button>
              <button
                onClick={(e) => {
                  void e.preventDefault();
                  void push(data ? `/${data?.username}` : "");
                }}
                className="mx-2 rounded-md	 bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
              >
                see public page
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;

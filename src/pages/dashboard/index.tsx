import React from "react";
import { api } from "y/utils/api";
import PrivateLink from "y/components/entities/PrivateLink";
import { UserLogo } from "y/components/shared/UserLogo";
import { Username } from "y/components/shared/Username";

const Links = () => {
  const ctx = api.useContext();

  const { data } = api.link.getAllUserLinks.useQuery();
  const { mutate } = api.link.createLink.useMutation({
    onSuccess: () => {
      void ctx.link.getAllUserLinks.invalidate();
    },
    onError: (err) => {
      const error = err.data?.zodError?.fieldErrors.content;
      console.log(error);
    },
  });

  const createEmptyLink = () => {
    mutate({ name: "name", to: "#" });
  };

  return (
    <main className="flex w-full flex-col items-center justify-center bg-gray-100 px-6 lg:w-1/2">
      <div className="mb-2">
        <UserLogo />
      </div>
      <div className="mb-2">
        <Username username="vrh" />
      </div>
      {data?.map((link) => {
        return <PrivateLink key={link.id} link={link} />;
      })}
      <br />
      <button onClick={createEmptyLink}>add</button>
    </main>
  );
};

export default Links;

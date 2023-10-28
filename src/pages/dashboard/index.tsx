import React, { useEffect, useRef, useState } from "react";
import PrivateLink from "y/components/entities/PrivateLink";
import EditIcon from "y/components/shared/EditIcon";
import OkIcon from "y/components/shared/OkIcon";
import { UserAvatar } from "y/components/shared/UserLogo";
import { api } from "y/utils/api";

const Links: React.FC = () => {
  const ctx = api.useContext();
  const {
    data: user,
    isLoading,
    isFetched,
  } = api.user.getCurrentUser.useQuery();
  const [username, setUsername] = useState<string>(user?.username ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const publicLink = useRef<string | null>(null);

  const { data } = api.link.getAllUserLinks.useQuery();
  const ref = useRef<HTMLInputElement>(null);

  const { mutate } = api.link.createLink.useMutation({
    onSuccess: () => {
      void ctx.link.getAllUserLinks.invalidate();
    },
  });

  useEffect(() => {
    setUsername(user?.username ?? "");
    if (user) {
      publicLink.current = `${window.location.origin}/${user.username}`;
    }
  }, [isFetched]);

  useEffect(() => {
    setUsername(user?.username ?? "");
  }, [user?.username]);

  const { mutate: updateUsername } = api.user.updateUsername.useMutation({
    onSuccess: () => {
      void ctx.user.getCurrentUser.invalidate();
    },
  });

  const createEmptyLink = () => {
    const position = data ? String(data.length + 1) : "0";
    mutate({ name: "name", to: "#", position });
  };

  const editUsername = () => {
    if (isEditing) {
      updateUsername({ username });
    }
    setIsEditing(!isEditing);
  };
  return (
    <main className="flex w-full flex-col items-center justify-center bg-gray-100 px-6 lg:w-1/2">
      <div className="mb-2">
        <UserAvatar username={username ?? ""} />
      </div>
      <div className="mb-2 flex flex-row">
        <div className="centered max-h-100px mb-5 flex-row ">
          <div className="mr-2" onClick={editUsername}>
            {isEditing ? <OkIcon /> : <EditIcon />}
          </div>
          <input
            style={{
              width: ref.current
                ? String(ref.current.value.length) + "ch"
                : "auto",
            }}
            className={`w-max rounded bg-transparent outline-none ${
              isEditing ? "outline-gray-500" : ""
            }`}
            ref={ref}
            id="username"
            name="username"
            type="text"
            disabled={!isEditing}
            value={username}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                editUsername();
              }
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      {data?.map((link) => {
        return <PrivateLink key={link.id} link={link} />;
      })}
      <br />
      <button
        className="rounded-md border-2 border-gray-500 px-3 py-1"
        onClick={createEmptyLink}
      >
        add
      </button>
      <a href={publicLink.current ?? ""} target="_blank" className="mt-3">
        see public profile
      </a>
    </main>
  );
};

export default Links;

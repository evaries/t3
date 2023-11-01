import React, { type CSSProperties, useEffect, useRef, useState } from "react";
import PrivateLink from "y/components/entities/PrivateLink";
import EditIcon from "y/components/shared/EditIcon";
import OkIcon from "y/components/shared/OkIcon";
import { UserAvatar } from "y/components/shared/UserLogo";
import { api } from "y/utils/api";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GetSessionParams, getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";

export type LinksProps = {
  session: Session;
  desirableUsername: string | undefined;
};

const Links: React.FC<LinksProps> = ({
  session,
  desirableUsername,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const ctx = api.useContext();
  const router = useRouter();
  const { data: user, isFetched } = api.user.getCurrentUser.useQuery();
  const [username, setUsername] = useState<string | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const [inputStyle, setInputStyle] = useState<CSSProperties>({});
  const publicLink = useRef<string | null>(null);

  const { data } = api.link.getAllUserLinks.useQuery();
  const ref = useRef<HTMLInputElement>(null);

  const { mutate } = api.link.createLink.useMutation({
    onSuccess: () => {
      void ctx.link.getAllUserLinks.invalidate();
    },
  });

  useEffect(() => {
    if (!isFetched) return;
    if (desirableUsername) {
      updateUsername({ username: desirableUsername });
      setUsername(desirableUsername);
      void router.replace(location.pathname, undefined, { shallow: true });
      return;
    }
    if (user) {
      if (!user.username) {
        updateUsername({ username: session.user.id });
        setUsername(session.user.id);
      }
      setUsername(user.username);
    }
  }, [isFetched]);

  useEffect(() => {
    inputStyles();
  }, [username?.length]);

  const { mutate: updateUsername } = api.user.updateUsername.useMutation({
    onSuccess: () => {
      setUsername(desirableUsername ? desirableUsername : username);
      void ctx.user.getCurrentUser.invalidate();
      if (username) {
        publicLink.current = `${window.location.origin}/${username}`;
      }
    },
  });

  const createEmptyLink = () => {
    const position = data ? String(data.length + 1) : "0";
    mutate({ name: "name", to: "#", position });
  };

  const editUsername = () => {
    if (isEditing) {
      updateUsername({ username: username ?? "" });
      setUsername(username);
    }
    setIsEditing(!isEditing);
  };

  const inputStyles = () => {
    setInputStyle({
      width: ref.current ? String(ref.current.value.length) + "ch" : "auto",
    });
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
            style={inputStyle}
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
type ProfileData = {
  session: Session;
  desirableUsername?: string | undefined;
};

export const getServerSideProps: GetServerSideProps<ProfileData> = async (
  context
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const desirableUsername = context.query.username
    ? String(context.query.username)
    : undefined;
  return {
    props: { session, desirableUsername },
  };
};

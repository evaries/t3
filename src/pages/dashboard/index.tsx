import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import { type Session } from "next-auth";
import { getSession } from "next-auth/react";
import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import Cookies from "universal-cookie";
import PrivateLink from "y/components/entities/PrivateLink";
import { SocialDialog } from "y/components/entities/SocialDialog";
import EditIcon from "y/components/shared/icons/Edit";
import Loader from "y/components/shared/Loader";
import OkIcon from "y/components/shared/icons/OkIcon";
import { UserAvatar } from "y/components/shared/UserLogo";
import { Button } from "y/components/ui/button";
import { api } from "y/utils/api";
import SocialLinks from "y/components/entities/SocialLinks";

export type LinksProps = {
  session: Session;
  desirableUsername: string | undefined;
};

const Links: React.FC<LinksProps> = ({
      session,
      desirableUsername,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const ctx = api.useContext();
  const { data: user, isFetched } = api.user.getCurrentUser.useQuery();
  const [username, setUsername] = useState<string | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState<string | undefined>("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [inputStyle, setInputStyle] = useState<CSSProperties>({});
  const publicLink = useRef<string | null>(null);

  const { data: socialLinks } = api.link.getUserSocialLinks.useQuery();
  const { data: customLinks } = api.link.getUserCustomLinks.useQuery();
  const ref = useRef<HTMLInputElement>(null);

  const { mutate, isLoading } = api.link.createLink.useMutation({
    onSuccess: () => {
      void ctx.link.getUserCustomLinks.invalidate();
      void ctx.link.getUserSocialLinks.invalidate();
    },
  });

  useEffect(() => {
    if (!isFetched) return;
    if (desirableUsername) {
      updateUser({ username: desirableUsername });
      setUsername(desirableUsername);
      const cookies = new Cookies();
      cookies.remove("username");
      return;
    }
    if (user) {
      if (!user.username) {
        updateUser({ username: session?.user.id ?? "" });
        setUsername(session?.user.id ?? "");
      }
      setUsername(user.username);
      setBio(user.bio ?? "");
    }
  }, [isFetched]);

  useEffect(() => {
    inputStyles();
    if (username) {
      publicLink.current = `${window.location.origin}/${username}`;
    }
  }, [username?.length]);

  const { mutate: updateUser } = api.user.updateUser.useMutation({
    onSuccess: () => {
      setUsername(desirableUsername ? desirableUsername : username);
      void ctx.user.getCurrentUser.invalidate();
      if (username) {
        publicLink.current = `${window.location.origin}/${username}`;
      }
    },
  });

  const createEmptyLink = () => {
    const position = customLinks ? String(customLinks.length + 1) : "0";
    mutate({ name: "name", to: "#", position });
  };

  const editUsername = () => {
    if (isEditing) {
      updateUser({ username: username ?? "" });
      setUsername(username);
    }
    setIsEditing(!isEditing);
  };
  const editBio = () => {
    if (isEditingBio) {
      updateUser({ bio: bio ?? "" });
      setBio(bio);
    }
    setIsEditingBio(!isEditingBio);
  };

  const inputStyles = () => {
    setInputStyle({
      width: ref.current ? String(ref.current.value.length) + "ch" : "auto",
    });
  };
  return (
    <main className="flex w-full max-w-[500px] flex-col items-center justify-center bg-gray-100 p-6 lg:w-1/2">
      <div className="mb-2">
        <UserAvatar username={username ?? ""} />
      </div>
      <div className="flex flex-row py-1">
        <div className="centered max-h-100px flex flex-row ">
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
      {bio || isEditingBio ? (
        <div className="flex flex-row py-1">
          <div className="mr-2" onClick={editBio}>
            {isEditingBio ? <OkIcon /> : <EditIcon />}
          </div>
          <input
            style={inputStyle}
            className={`w-max rounded bg-transparent outline-none ${
              isEditingBio ? "outline-gray-500" : ""
            }`}
            ref={ref}
            id="bio"
            name="bio"
            type="text"
            disabled={!isEditingBio}
            value={bio}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                editBio();
              }
            }}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      ) : (
        <div onClick={() => setIsEditingBio(true)}>add bio</div>
      )}
      {socialLinks ? <SocialLinks links={socialLinks} removable /> : null}
      {customLinks?.map((link) => {
        return <PrivateLink key={link.id} link={link} />;
      })}
      <br />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex w-full">
          <div className="mr-[32px] flex w-full justify-between gap-2">
            <Button
              variant="default"
              className="px-8"
              onClick={createEmptyLink}
            >
              add
            </Button>
            <SocialDialog />
            <a href={publicLink.current ?? ""} target="_blank" rel="noreferrer">
              <Button variant="outline">see public profile</Button>
            </a>
          </div>
        </div>
      )}
    </main>
  );
};

export default Links;
type ProfileData = {
  session?: Session | undefined;
  desirableUsername?: string | undefined;
};

export const getServerSideProps: GetServerSideProps<ProfileData> = async (
  context
) => {
  const session = await getSession(context);
  const cookies = new Cookies(context.req.headers.cookie);
  const desirableUsername = cookies.get("username")
    ? String(cookies.get("username"))
    : undefined;
  return {
    props: {
      session: session ?? undefined,
      desirableUsername: desirableUsername,
    },
  };
};

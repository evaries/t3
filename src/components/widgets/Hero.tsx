import type { NextPage } from "next";
import { useRouter } from "next/router";
import { type ChangeEvent, useEffect, useState } from "react";
import { api } from "y/utils/api";
import { type UsernameValidation } from "y/utils/types";
import { validationErrorText } from "y/utils/utils";
import Cookies from "universal-cookie";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Hero: NextPage = () => {
  const router = useRouter();
  const [origin, setOrigin] = useState<string>();
  const [username, setUsername] = useState<string>("");
  const [usernameValidation, setUsernameValidation] =
    useState<UsernameValidation>("valid");

  useEffect(() => {
    setOrigin(window.location.hostname);
  }, []);

  const { data: user, error } = api.user.getUserByUsername.useQuery({
    id: username,
  });

  const checkUsername = () => {
    if (!!user) {
      setUsernameValidation("exist");
      return;
    }
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!regex.test(username)) {
      setUsernameValidation("wrong");
      return;
    }
    if (error) {
      setUsernameValidation("general");
      return;
    }
    const cookies = new Cookies();
    cookies.set("username", username);
    void router.push("/auth/signin");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameValidation("valid");
    setUsername(e.target.value);
  };

  return (
    <div id="hero" className="section centered flex-col px-4">
      <h1 className="mb-5 text-center  text-4xl font-bold sm:text-5xl md:text-6xl ">
        Share your link easily
      </h1>
      <h3 className=" mb-6 text-center text-sm sm:text-2xl md:text-3xl">
        Keep multiple links in one place. Share one.
      </h3>
      <div className="centered">
        <div className="flex w-full max-w-[360px] items-center">
          <div className=" flex items-center px-3 py-[2px]">
            <span>{origin}/</span>
            <Input autoFocus value={username} onChange={(e) => onChange(e)} />
          </div>
        </div>
        <Button
          size={"sm"}
          variant={"default"}
          onClick={() => void checkUsername()}
        >
          get link
        </Button>
      </div>
      <span
        className={`${
          usernameValidation !== "valid" ? "visible" : "invisible"
        } mt-3 block min-h-[40px]  text-sm text-red-500`}
      >
        {validationErrorText(usernameValidation)}
      </span>
    </div>
  );
};
export default Hero;

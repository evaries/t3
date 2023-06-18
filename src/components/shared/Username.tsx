import type { NextPage } from "next";

export const Username: NextPage<{ username: string }> = ({ username }) => {
  return <div className="centered max-h-100px mb-5 ">{`@${username}`}</div>;
};

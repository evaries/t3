import { NextPage } from "next";
export const UserAvatar: NextPage<{ url: string }> = ({ url }) => {
  return (
    <div className="centered max-h-100px mb-5 ">
      <img className="h-10 w-10 rounded-full" src={url} alt="Rounded avatar" />
    </div>
  );
};

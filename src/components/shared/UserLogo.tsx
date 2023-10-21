import type { NextPage } from "next";
export const UserAvatar: NextPage<{ username?: string }> = ({ username = '' }) => {
  console.log(username);

  return (
    <div className="centered max-h-100px mb-5 ">
      <div className="flex items-center justify-center text-3xl rounded-full h-16 w-16 bg-gray-300 text-gray-700">{username[0]}</div>
    </div>
  );
};

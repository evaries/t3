import type { NextPage } from "next";

export type UserAvatarProps = {
  username?: string;
  imageUrl?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ username = '', imageUrl }) => {

  return (
    <div className="centered max-h-100px mb-5 ">
      {imageUrl ? <div className="flex items-center justify-center rounded-full h-16 w-16 overflow-hidden">
        <img src={imageUrl} className="flex w-full object-fill " />
      </div> :
        <div className="flex items-center justify-center text-3xl rounded-full h-16 w-16 bg-gray-300 text-gray-700">
          {username[0]}
        </div>}
    </div>
  );
};

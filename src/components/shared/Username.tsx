import { NextPage } from "next";

export const Username: NextPage<{ username: string }> = ({ username }) => {
  return (
    <div className="centered mb-5 max-h-100px "  >
      {`@${username}`}
    </div>
  )
}

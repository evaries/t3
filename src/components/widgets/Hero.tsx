import { NextPage } from "next";
import { useEffect, useState } from "react";
import { api } from "y/utils/api";

const Hero: NextPage = () => {
  const ctx = api.useContext();
  const [origin, setOrigin] = useState<string>()
  const [username, setUsername] = useState<string>('')
  const [isUserExist, setIsUserExist] = useState<boolean>(false)

  useEffect(() => {
    setOrigin(window.location.hostname)
  }, [])

  const { data: user, isLoading } = api.user.getUserByUsername.useQuery({
    id: username,
  });
  return (
    <div id="hero" className="section centered flex-col px-4">
      <h1 className="font-bold text-center text-5xl mb-5 sm:text-7xl ">Share your link easily</h1>
      <h3 className="text-3xl text-center mb-6 sm:text-2xl" >Keep multiple links in one place. Share one.</h3>
      <div className="centered items-start" >
        <div>
          <div className="flex py-[2px] px-3 rounded border-2 border-grey-500">
            <span>{origin}/</span>
            <input
              className={`ml-1 bg-transparent focus:outline-none focus:border-transparent focus:ring-0 ${isUserExist ? "text-red-500" : ""} `} autoFocus
              value={username}
              onChange={(e) => {
                setIsUserExist(false)
                setUsername(e.target.value)
              }}
            />
          </div>

          <span className={`${isUserExist ? "visible" : "invisible"} text-sm text-red-500`} >Sorry, this link already in use</span>
        </div>
        <button
          className="ml-3 sm:ml-6 py-[2px] px-3 rounded border-2 border-gray-500 whitespace-nowrap"
          onClick={() => setIsUserExist(!!user)}
        >
          get link
        </button>
      </div>
    </div >
  )
}
export default Hero; 

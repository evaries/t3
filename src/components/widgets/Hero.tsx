import { NextPage } from "next";
import { useEffect, useState } from "react";
import { api } from "y/utils/api";
import { UsernameValidation } from "y/utils/types";
import { validationErrorText } from "y/utils/utils";


const Hero: NextPage = () => {
  const [origin, setOrigin] = useState<string>()
  const [username, setUsername] = useState<string>('')
  const [usernameValiation, setUsernameValiation] = useState<UsernameValidation>('valid')

  useEffect(() => {
    setOrigin(window.location.hostname)
  }, [])

  const { data: user, error } = api.user.getUserByUsername.useQuery({
    id: username,
  });

  const checkUsername = () => {
    if (!!user) {
      setUsernameValiation('exist')
      return
    }
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!regex.test(username)) {
      setUsernameValiation('wrong')
      return
    }
    if (error) {
      setUsernameValiation('general')
      return
    }
    // const params = new URLSearchParams(searchParams)
  }
  return (
    <div id="hero" className="section centered flex-col px-4">
      <h1 className="font-bold text-center  mb-5 text-4xl md:text-6xl sm:text-5xl ">Share your link easily</h1>
      <h3 className=" text-center mb-6 text-sm md:text-3xl sm:text-2xl" >Keep multiple links in one place. Share one.</h3>
      <div className="centered items-start" >
        <div className="max-w-[360px] w-full">
          <div className="flex py-[2px] px-3 rounded border-2 border-grey-500">
            <span>{origin}/</span>
            <input
              className={`ml-1 bg-transparent focus:outline-none focus:border-transparent focus:ring-0 ${usernameValiation !== 'valid' ? "text-red-500" : ""} `} autoFocus
              value={username}
              onChange={(e) => {
                setUsernameValiation('valid')
                setUsername(e.target.value)
              }}
            />
          </div>
          <span className={`${usernameValiation !== 'valid' ? "visible" : "invisible"} block min-h-[40px]  text-sm text-red-500`}>{validationErrorText(usernameValiation)}</span>
        </div>
        <button
          className="ml-3 sm:ml-6 py-[2px] px-3 rounded border-2 border-gray-500 whitespace-nowrap"
          onClick={checkUsername}
        >
          get link
        </button>
      </div>
    </div >
  )
}
export default Hero; 

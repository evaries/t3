import { NextPage } from "next";
import { useEffect, useState } from "react";

const Hero: NextPage = () => {
  const [origin, setOrigin] = useState<string>()

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  return (
    <div id="hero" className="section centered flex-col">
      <h1 className="font-bold text-center text-7xl mb-5">Share your link easily</h1>
      <h3 className="text-3xl text-center mb-6" >Keep multiple links in one place. Share one.</h3>
      <div className="centered" >
        <span>{origin}/</span>
        <input className="bg-gray-200 ml-1 rounded border-1 border-gray-300 " autoFocus />
        <button className="ml-6 py-[2px] px-3 rounded border-2 border-gray-500 " >get your link</button>
      </div>
    </div>
  )
}
export default Hero; 

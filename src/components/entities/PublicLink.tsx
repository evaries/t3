import { NextPage } from "next"

export type PublicLinkProps = {
  text: string
}

const PublicLink: NextPage<PublicLinkProps> = ({ text }) => {
  return (
    <div className="centered max-w-xs h-30" >
      <button type="button"
        className="flex w-full justify-center text-gray-900 mt-2 bg-gray-200 hover:bg-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500">
        <svg className="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
        {text}
      </button>
    </div>
  )
}

export default PublicLink

import { NextPage } from "next";

export type PublicLinkProps = {
  text: string;
};

const PublicLink: NextPage<PublicLinkProps> = ({ text }) => {
  return (
    <div className="centered h-30 max-w-xs">
      <button
        type="button"
        className="mt-2 flex inline-flex w-full items-center justify-center rounded-lg bg-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none dark:focus:ring-gray-500"
      >
        <svg
          className="-ml-1 mr-2 h-4 w-4 text-[#626890]"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="ethereum"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
          ></path>
        </svg>
        {text}
      </button>
    </div>
  );
};

export default PublicLink;

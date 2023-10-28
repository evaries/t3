import type { NextPage } from "next";

const Toggle: NextPage<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        value=""
        defaultChecked={isActive}
        className="peer sr-only"
      />
      <div
        className="peer flex h-5 w-9 items-center rounded-full  
     bg-gray-200 after:absolute after:left-[2px] after:top-[2px] 
    after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 
    after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none 
    dark:border-gray-600 dark:bg-gray-300"
      ></div>
    </label>
  );
};

export default Toggle;

const Toggle = () => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="flex items-center w-9 h-5 bg-gray-200 peer-focus:outline-none  
     rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full 
    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
    after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all 
    dark:border-gray-600 peer-checked:bg-gray-600"></div>
    </label>
  )
}

export default Toggle

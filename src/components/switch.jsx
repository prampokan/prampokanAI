import { useState } from "react"

const Switch = () => {

  const [isSelected, setIsSelected] = useState(false);

  return (
    <div 
        className={`${isSelected ? "bg-red-500" : "bg-lime-300"} flex w-9 h-5 p-[2px]  rounded-full cursor-pointer shadow-inner`} 
        onClick={() => setIsSelected(!isSelected)}>
            <span 
                className={`${isSelected ? "translate-x-full" : ""} h-full w-1/2 bg-white rounded-full transition-all duration-300 shadow-sm`}
            />
    </div>
  )
}

export default Switch
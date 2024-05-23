import { requestToGroqAI } from "./utils/groq"
import { useState, useEffect, useRef } from "react";
import {Light as SyntaxHighlight} from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { TailSpin } from 'react-loader-spinner'
import Switch from "./components/switch";
import Bar from "./components/bar";

function App() {
  const [data, setData] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      const ai = await requestToGroqAI(content.value);
      setData(ai);
      setIsLoading(false);
    }, 2000);
  };

  return (
  <div className={`${darkMode && "dark"}`}>
    <main className="flex flex-col justify-center font-poppins h-screen bg-zinc-50 dark:bg-dark">
        <div className="h-14 absolute top-0 shadow-sm w-full flex justify-center items-center bg-white dark:bg-zinc-900 lg:px-0 px-5">
          <div className="w-[50rem] flex items-center justify-between">
            <h1 className='text-xl font-bold text-zinc-700 dark:text-zinc-100 cursor-pointer'><a href="/">tekkom ai</a></h1>
            <div className="relative flex flex-col" ref={divRef}>
              <Bar onclick={() => setOpen(!open)}/>
              <div
                className={`${open ? "opacity-100 translate-y-5 -translate-x-2" : ""} shadow-sm rounded-md p-2 w-44 opacity-0 bg-white dark:bg-zinc-900 absolute top-8 right-0 transition-all flex flex-col gap-2`}
              >
                <a href="https://github.com/prampokan/prampokanAI" target="_blank" className="flex justify-between dark:text-zinc-100 text-zinc-700 dark:bg-dark px-2 py-3 bg-zinc-50 rounded-md items-center shadow-inner cursor-pointer transition-all hover:bg-zinc-100">
                    <h1 className='font-medium text-sm '>Go to code</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                </a>
                <div className="flex justify-between px-2 py-3 bg-zinc-50 dark:bg-dark rounded-md items-center shadow-inner">
                  <h1 className="font-medium text-sm text-zinc-700 dark:text-zinc-100">Dark</h1>
                  <div onClick={toggleDarkMode}>
                    <Switch/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center overflow-auto lg:px-0 px-5">
          <div className="w-[45rem] h-full text-center">
            <div className="pt-20 pb-32">
              {data ? 
              <SyntaxHighlight language="swift" style={darcula} wrapLongLines={true}>
                {data}
              </SyntaxHighlight>
              : <h1 className={`${isLoading ? "animate-pulse" : ""} select-none text-3xl md:text-7xl font-black opacity-10 dark:text-zinc-500`}>🚀Tekkom AI</h1>
              }
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 pb-14 w-full flex flex-col justify-center h-14 items-center bg-zinc-50 dark:bg-dark lg:px-0 px-5">
          <div className="w-full lg:w-[50rem]">
          <form
            onSubmit={handleSubmit} 
            className="w-full bg-white dark:bg-zinc-900 h-14 pl-7 pr-3 py-2 flex justify-between rounded-full shadow-sm"
            >
            <input 
              type="text" 
              id="content" 
              className="w-full outline-none dark:bg-zinc-900 dark:text-zinc-100 pr-4" 
              placeholder="Kirim pesan ke Tekkom AI"
              autoComplete="off"
            />
            <button 
              className="rounded-full bg-zinc-100 dark:bg-dark h-10 w-10 flex items-center justify-center text-zinc-400 dark:text-zinc-100 hover:bg-zinc-300 transition-all"
              type="button"
              onClick={handleSubmit} 
            >
              {isLoading ? 
                <TailSpin
                  visible={true}
                  height="25"
                  width="25"
                  color="gray"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                /> 
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              }
            </button>
          </form>
          </div>
          <h1 className="mt-3 text-zinc-300 dark:text-zinc-700 text-[10px] sm:text-sm">Built with React and GroqAI by <a href="https://pramudya-diagusta.vercel.app/" target="_blank">Pramudya Diagusta</a></h1>
        </div>
    </main>
   </div>
  )
}

export default App

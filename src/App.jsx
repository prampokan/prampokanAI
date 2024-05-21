import { requestToGroqAI } from "./utils/groq"
import { useState } from "react";
import {Light as SyntaxHighlight} from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { TailSpin } from 'react-loader-spinner'

function App() {
  const [data, setData] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
   <main className="flex flex-col justify-center font-poppins h-screen bg-neutral-100">
      <div className="h-14 absolute top-0 shadow-sm w-full flex justify-center items-center bg-white lg:px-0 px-5">
        <div className="w-[50rem] flex items-center justify-between">
          <h1 className='text-xl font-bold text-neutral-700 cursor-pointer'><a href="/">🚀Tekkom AI</a></h1>
          <h1 className='font-medium flex items-center gap-2 text-neutral-700 cursor-pointer hover:text-blue-500 transition-all'>Go to code
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
          </h1>
        </div>
      </div>
      <div className="flex justify-center overflow-auto lg:px-0 px-5">
        <div className="w-[45rem] h-full text-center py-20">
          {data ? 
           <SyntaxHighlight language="swift" style={darcula} wrapLongLines={true}>
            {data}
          </SyntaxHighlight>
          : <h1 className={`${isLoading ? "animate-pulse" : ""} select-none text-3xl md:text-7xl font-black opacity-10`}>🚀Tekkom AI</h1>
          }
        </div>
      </div>
      <div className="absolute bottom-0 pb-14 w-full flex justify-center h-14 items-center bg-neutral-100 lg:px-0 px-5">
        <div className="w-[50rem]">
        <form
          onSubmit={handleSubmit} 
          className="w-full bg-white h-14 pl-7 pr-3 py-2 flex justify-between rounded-full shadow-sm"
          >
          <input 
            type="text" 
            id="content" 
            className="w-full outline-none" 
            placeholder="Kirim pesan ke Tekkom AI"
            autoComplete="off"
          />
          <button 
            className="rounded-full bg-slate-100 h-10 w-10 flex items-center justify-center text-neutral-700 hover:bg-neutral-300 transition-all"
            type="button"
            onClick={handleSubmit} 
          >
            {isLoading ? 
              <TailSpin
                visible={true}
                height="25"
                width="25"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              /> 
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
            }
          </button>
        </form>
        </div>
      </div>
   </main>
  )
}

export default App

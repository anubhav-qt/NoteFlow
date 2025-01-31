import { FaPaperclip } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";

const Input = () => {
  return (
    <>
      <div className="flex justify sticky text-neutral-300 left-0.5 input mb-[50px] w-[720px] h-[60px] border-2 border-neutral-700 rounded-full bg-neutral-950">
        <div className="flex gap-1.5 items-center relative left-3"><FaPaperclip color="white" size="18px" /><IoCameraOutline color="white" size="23px" /></div>
        <input type="text" placeholder="Text -> Notes" className="mr-10 ml-5 w-full h-full bg-transparent outline-none" />
      </div>

    </>
  )
}

export default Input;
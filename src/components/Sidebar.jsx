import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="flex justify-center bg-neutral-900 py-2 h-screen w-[75px]">
      <div className="sidebar-container flex flex-col justify-between items-center">
        <div className="menu pt-7"><RxHamburgerMenu color="white" size="20px" /></div>
        <div className="search pb-14"><IoSearch color="white" size="20px" /></div>
      </div>
    </aside>
  )
}

export default Sidebar;
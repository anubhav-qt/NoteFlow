import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
        <nav className="flex justify-between w-full">
            <div className="profile pt-8 pl-4"><CgProfile color="white" size="30px" /></div>
            <div className="text-white pr-7 pt-8">NoteFlow</div>
        </nav>
    )
}

export default Navbar;
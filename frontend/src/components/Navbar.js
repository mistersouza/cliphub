import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { AppContext } from "../context/AppContext";

import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Avatar from "./Avatar";

const Navbar = () => {
  // const { user, setUser } = useContext(AppContext);
  const user = true;

  const handleLogoutSubmit = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      // setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center border-b-2 border-gray-200">
      <Link to="/">
        <div className="text-4xl font-bold text-gray-800 flex items-center">
          <span>cliphub</span>
          <span className="text-gray-500 text-5xl">&gt;&gt;</span>
        </div>
      </Link>
      <div className="hidden relative md:block">
        <form
          className="absolute md:static top-10 -left-20 bg-white"
          onSubmit={() => {}}
        >
          <input
            value={""}
            onChange={() => {}}
            className="bg-primary p-2 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={() => {}}
            className="absolute md:right-5 right-6 top-2.5 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      {user ? (
        <div className="flex items-center gap-3 md:gap-5">
          <Link to={"/"}>
            <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
              <IoMdAdd className="text-xl" />{" "}
              <span className="hidden md:block">Upload </span>
            </button>
          </Link>
          <Link to={"/"}>
            <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </Link>
          <button
            className="curser-pointer text-3xl text-gray-800"
            onClick={() => {}}
          >
            <AiOutlineLogout />
          </button>
        </div>
      ) : (
        <div>
          <button className="curser-pointer text-3xl text-gray-800">
            <AiOutlineLogin />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

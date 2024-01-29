import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

import Discover from "./Discover";
import Footer from "./Footer";
import SuggestedAccounts from "./SuggestedAccounts";
import SignUpForm from "./auth/SignUpForm";

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const { pathParam } = useParams();
  const user = false;

  const styles = {
    link: {
      base:
        "flex items-center gap-3 p-3 justify-center font-semibold text-gray-800 rounded xl:justify-start hover:bg-gray-200",
      active:
        "flex items-center gap-3 p-3 justify-center font-semibold xl:justify-start hover:bg-gray-200",

    }
  }

  return (
    <div>
      <div
        className="flex justify-center py-3 xl:hidden"
        onClick={() => setToggleSidebar((prev) => !prev)}
      >
        {toggleSidebar ? (
          <ImCancelCircle className="text-2xl" />
        ) : (
          <AiOutlineMenu className="text-2xl" />
        )}
      </div>
      {toggleSidebar && (
        <div className="flex flex-col justify-start w-20 mb-10 border-r-2 border-gray-100 xl:w-full  xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link to="/">
              <div className={pathParam ? styles.link.base : styles.link.active}>
                <AiFillHome className="text-2xl" />
                <span className="hidden xl:block text-xl">For you</span>
              </div>
            </Link>
          </div>
          {!user && (
            <div className='hidden py-5 xl:block'>
              <p className="text-gray-500 text-center py-2">
                Log in to like and comment on clips
              </p>
              <Link
                className="block text-center text-lg text-gray-800 font-semibold py-2.5 border border-gray-800 rounded hover:bg-gray-800 hover:text-gray-50"
                onClick={() => {}}
              >Log in</Link>
            </div>
          )}
          <Discover />
          <SignUpForm />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;

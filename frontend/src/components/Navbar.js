// React imports
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Icons imports
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
// Dependacies imports
import axios from 'axios';
// Components imports
import Avatar from './Avatar';
import AuthModal from './AuthModal';
import DropdownMenu from './DropdownMenu';
// Helpers imports
import { AppContext } from '../context/AppContext';
import { useDisplay } from '../utils/helpers';

const Navbar = () => {
  const [isAuthModalDisplayed, toggleAuthModalDisplay] = useDisplay();
  const [isDropdownMenuDisplayed, toggleDropdownMenuDisplay] = useDisplay();
  const { user, setUser, query, setQuery } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleLogoutSubmit = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.log('Error loging out', error);
    }
  };

  return (
    <div
      className="
        flex justify-between items-center border-b-2 border-gray-200 py-1 px-3
      "
    >
      <Link to="/" aria-label="Back to the homepage - ClipHub">
        <img
          className="w-16 md:w-20 lg:w-28 h-auto mx-auto"
          src="/cliphub_logo.png"
          alt="cliphub logo"
        />
      </Link>

      <div className="hidden relative md:block">
        <form
          className="absolute md:static top-10 -left-20 bg-white"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="search-clips" className="sr-only">
            Search clips
          </label>
          <input
            className="
            bg-gray-50 p-2 md:text-md font-medium border-2 
            border-gray-50 focus:outline-none
            focus:border-gray-300 w-[300px] md:w-[350px] 
            rounded-full md:top-0
            "
            id="search-clips"
            onChange={({ target }) => setQuery(target.value)}
            value={query}
            placeholder="Search clips"
          />
          <button
            className="
            absolute md:right-5 right-6 top-2.5 border-l-2 
            border-gray-300 pl-4 text-2xl text-gray-400
            "
            aria-label="Search"
            onClick={handleSearchSubmit}
          >
            <BiSearch />
          </button>
        </form>
      </div>
      {user ? (
        <div className="flex items-center gap-2 md:gap-5">
          <Link to={'/upload'} aria-label="Upload a new clip" role="button">
            <button
              className="
                hidden md:flex items-center justify-between bg-transparent text-lg text-gray-800 
                border border-gray-800 rounded hover:bg-gray-800 hover:text-gray-50
              "
              aria-hidden="true"
            >
              <IoMdAdd className="text-xl" />
              <span className="hidden md:block text-lg pr-1">Upload</span>
            </button>
          </Link>
          <button
            className="relative"
            onClick={toggleDropdownMenuDisplay}
            aria-label="Your options"
          >
            <Avatar src={user.profile_image} />
            <DropdownMenu
              menu={isDropdownMenuDisplayed}
              handleDropdownMenu={toggleDropdownMenuDisplay}
              handleAuth={handleLogoutSubmit}
            />
          </button>
        </div>
      ) : (
        <div className="flex gap-3 justify-center items-center">
          <button
            className="
              hidden md:block bg-gray-800 text-center text-lg text-gray-50 
              font-semibold px-5 border border-gray-800 rounded hover:bg-transparent
              hover:text-gray-800
            "
            onClick={toggleAuthModalDisplay}
          >
            Log in
          </button>
          <button
            className="relative"
            onClick={toggleDropdownMenuDisplay}
            aria-label="Log In"
          >
            <PiDotsThreeVerticalBold className="text-2xl text-gray-700" />
            <DropdownMenu
              menu={isDropdownMenuDisplayed}
              handleDropdownMenu={toggleDropdownMenuDisplay}
              handleAuth={handleLogoutSubmit}
            />
          </button>
          <AuthModal
            modal={isAuthModalDisplayed}
            handleModalClick={toggleAuthModalDisplay}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;

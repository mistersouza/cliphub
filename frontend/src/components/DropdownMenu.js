// React imports
import { useContext } from 'react';
import { Link } from 'react-router-dom';
// Icons imports
import { AiOutlineLogout } from 'react-icons/ai';
// Helpers imports
import { AppContext } from '../context/AppContext';
import { useClickAway } from '../utils/helpers';
// Misc imports
import { dropdownMenuLinks } from '../utils/constants';

const DropdownMenu = ({ menu, handleDropdownMenu, handleAuth }) => {
  const { user } = useContext(AppContext);
  const dropdownMenuRef = useClickAway(() => {
    if (menu) handleDropdownMenu();
  });

  return (
    <div
      className={`z-10 ${menu ? 'absolute right-0 top-9' : 'hidden'} 
        bg-white divide-y divide-gray-100 rounded shadow 
        w-44`}
      id="dropdownDivider"
      ref={dropdownMenuRef}
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDividerButton"
      >
        {dropdownMenuLinks?.map((link, index) => (
          <li key={index}>
            <Link
              className="
                flex w-full justify-between items-center px-3 py-2 
                hover:bg-gray-100 dark:hover:bg-gray-600 
                dark:hover:text-white           
              "
              to={''}
            >
              {link.name}
              <span className="text-lg">{link.icon}</span>
            </Link>
          </li>
        ))}
      </ul>
      {user && (
        <div className="py-2">
          <button
            onClick={handleAuth}
            className="
              flex w-full justify-between items-center px-3 py-2 
              text-sm text-gray-700 hover:bg-gray-100 
              dark:hover:bg-gray-600 dark:text-gray-200 
              dark:hover:text-white
            "
          >
            Logout
            <AiOutlineLogout className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

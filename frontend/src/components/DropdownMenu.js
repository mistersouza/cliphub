// React imports
import { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// Icons imports
import { AiOutlineLogout } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { RiPresentationLine } from 'react-icons/ri';
import { GrMoney } from 'react-icons/gr';
// Helpers imports
import { AppContext } from '../context/AppContext';
import { useClickAway } from '../utils/helpers';

const DropdownMenu = ({ menu, handleDropdownMenu, handleAuth }) => {
    const { user } = useContext(AppContext);
    const dropdownMenuRef = useClickAway(() => {
        if (menu) handleDropdownMenu(); 
    }); 

    return (
        <div
            className={`z-10 ${menu ? 'absolute right-0 top-9' : 'hidden'} 
                        bg-white divide-y divide-gray-100 rounded-lg shadow 
                        w-44 dark:bg-gray-700 dark:divide-gray-600`}
            id="dropdownDivider"
            ref={dropdownMenuRef}
        >
            <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDividerButton"
            >
                <li>
                    <Link
                        className="
                            flex w-full justify-between items-center px-3 py-2 
                            hover:bg-gray-100 dark:hover:bg-gray-600 
                            dark:hover:text-white
                        "
                        to={`profiles/${user?.profile_id}`}
                    >
                        Profile
                        <CgProfile className="text-lg" />
                    </Link>
                </li>
                <li>
                    <Link
                        to="#"
                        className="
                            flex w-full justify-between items-center px-3 py-2 
                            hover:bg-gray-100 dark:hover:bg-gray-600 
                            dark:hover:text-white
                        "
                    >
                        DIY
                        <RiPresentationLine className="text-lg" />
                    </Link>
                </li>
                <li>
                    <Link
                        to="#"
                        className="
                            flex w-full justify-between items-center px-3 py-2 
                            hover:bg-gray-100 dark:hover:bg-gray-600 
                            dark:hover:text-white
                        "
                    >
                        Earnings
                        <GrMoney />
                    </Link>
                </li>
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

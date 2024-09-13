import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import Discover from './Discover';
import Footer from './Footer';
import PopularProfiles from './profiles/PopularProfiles';

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  // Link styles
  const { base, hover, active } = {
      base: 'flex items-center gap-3 py-3 px-4 justify-center' +
            'font-semibold text-gray-800 rounded',
      hover: 'hover:bg-gray-200',
      active: 'xl:justify-start',
    };
  
  return (
    <div>
      <div className='block xl:hidden text-lg px-8'
        onClick={() => setToggleSidebar(prev => !prev)}>
          {toggleSidebar 
            ? <ImCancelCircle /> 
            : <AiOutlineMenu />}
      </div>
      {toggleSidebar && (
        <div className="flex flex-col justify-start w-20 mb-10 border-r-2 
          border-gray-100 xl:w-full xl:border-0 p-3"
        >
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link to="/">
              <div className={`${base} ${hover} ${active}`}>
                <AiFillHome className="text-2xl" />
                <span className="hidden xl:block text-xl">For you</span>
              </div>
            </Link>
          </div>
          <Discover />
          <PopularProfiles />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;

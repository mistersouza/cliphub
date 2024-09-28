// Dependencies imports
import { Link } from 'react-router-dom';
// Icons imports
import { AiFillHome } from 'react-icons/ai';
// Components imports
import Discover from './Discover';
import Footer from './Footer';
import PopularProfiles from './profiles/PopularProfiles';

const Sidebar = () => {
  // Link styles
  const { base, hover, active } = {
    base:
      'flex items-center gap-3 py-3 px-4 justify-center' +
      'font-semibold text-gray-800 rounded',
    hover: 'hover:bg-gray-200',
    active: 'xl:justify-start',
  };

  return (
    <nav
      className="flex flex-col justify-start w-20 mb-10 border-r-2 
          border-gray-100 xl:w-full xl:border-0 p-3"
      role="navigation"
      aria-label="Journey Hub"
    >
      <div className="xl:border-b-2 border-gray-200 xl:pb-4">
        <Link to="/" aria-label="Your personalized journey">
          <div
            className={`${base} ${hover} ${active}`}
            aria-label="Check out what's in store for you"
            role="button"
            tabIndex={0}
          >
            <AiFillHome className="text-2xl" aria-hidden="true" />
            <span className="hidden xl:block text-xl">For you</span>
          </div>
        </Link>
      </div>
      <Discover />
      <PopularProfiles />
      <Footer />
    </nav>
  );
};

export default Sidebar;

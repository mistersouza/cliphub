// React imports
import { useContext } from 'react';
// Dependacies imports
import { Link } from 'react-router-dom';
// Icons imports
import { GoVerified } from 'react-icons/go';
import { AppContext } from '../../context/AppContext';

const PopularProfiles = () => {
  const { profiles } = useContext(AppContext);
  const { popularProfiles } = profiles;

  return (
    <div className="xl:border-b-2 border-gray-200 py-3">
      <p className="text-gray-800 font-semibold pb-3.5">Popular profiles</p>
      <div className="flex flex-col">
        {popularProfiles?.results.slice(0, 5).map((profile) => (
          <div className="flex items-center gap-2.5 px-1.5" key={profile.id}>
            <Link to={`/profiles/${profile.id}`}>
              <div
                className="
                  size-10 bg-no-repeat bg-center bg-cover rounded-full 
                  cursor-pointer
                "
                style={{ backgroundImage: `url(${profile.image})` }}
              ></div>
            </Link>
            <div className="hidden xl:flex flex-col">
              <span
                className="
                flex items-center gap-1 text-sm font-semibold text-gray-800
              "
              >
                @{profile.owner} <GoVerified className="text-sm" />
              </span>
              <span className="text-xs text-gray-400">{profile.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProfiles;

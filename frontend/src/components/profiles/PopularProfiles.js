import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import { AppContext } from "../../context/AppContext";

import Avatar from "../Avatar";

const PopularProfiles = () => {
  const { profiles } = useContext(AppContext);
  
  return (
    <div className="xl:border-b-2 border-gray-200 py-3">
      <p className="text-gray-800 font-semibold pb-3.5">Popular profiles</p>
      <div className="flex flex-col">
        {profiles?.results.map((profile) => (
          <div className="flex items-center gap-2.5 px-1.5" key={profile.id}>
            <Avatar src={profile.image} size={12} />
            <div className="hidden xl:flex flex-col">
              <span className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                @{profile.owner} <GoVerified className="text-sm"/>
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

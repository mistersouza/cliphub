import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import { Link } from "react-router-dom";

import ClipCard from "../Posts/ClipCard";
import NoResults from "../NoResults";
import { axiosResponse } from "../../api/axiosDefaults";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [active, setActive] = useState('clips');
  const [clipsTab, setClipsTab] = useState(true)
  const [likedTab, setLikedTab] = useState(false)
  const clipsRef = useRef(null)
  const likedRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false);
  const { id } = useParams();

  console.log("user profile", profile);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosResponse.get(`profiles/${id}/`);
        setProfile(data);
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    })();
  }, [id]);

  return (
    <div>
      <div className="flex items-center">
        <Link to={`profiles/${id}`}>
          <div
            className="size-20 bg-no-repeat bg-center bg-cover rounded-full cursor-pointer"
            style={{ backgroundImage: `url(${profile.image})` }}
          ></div>
        </Link>
        <div className="flex flex-col text-lg md:text-xl tracking-wider">
          <span className="flex items-center gap-1 font-semibold text-gray-800">
            @{profile.owner} <GoVerified className="text-sm md:text-lg" />
          </span>
          <span className="text-sm text-gray-400">{profile.name}</span>
        </div>
      </div>
      <div>
        <div className="flex gap-2 border-b border-gray-200">
          <p
            className={`text-xl cursor-pointer text-gray-500 px-3.5 py-1.5 ${
              clipsTab && active ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => {
              setActive('clips'); 
            }}
            onMouseEnter={() => {
              setClipsTab(true); 
              setLikedTab(false);
            }}
            onMouseLeave={() => {
              if (active === 'liked') {
                setClipsTab(false);
                setLikedTab(true); 
              }
            }}
            ref={clipsRef}
          >
            Clips
          </p>
          <p
            className={`text-xl cursor-pointer text-gray-500 px-3.5 py-1.5 ${
              likedTab && active ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => setActive('liked')}
            onMouseEnter={() => {
              setClipsTab(false); 
              setLikedTab(true); 
            }}
            onMouseLeave={() => {
              if (active === 'clips') {
                setClipsTab(true);
                setLikedTab(false); 
              }
            }}
            ref={likedRef}
          > 
            Liked
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

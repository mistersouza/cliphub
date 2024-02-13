import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import { Link } from "react-router-dom";

import ClipCard from "../Posts/ClipCard";
import NoResults from "../NoResults";
import { axiosRequest, axiosResponse } from "../../api/axiosDefaults";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [tab, setTab] = useState("clips");
  const [clipsActive, setClipsActive] = useState(true);
  const [likedActive, setLikedActive] = useState(false);
  const [profileClips, setProfileClips] = useState({ results: [] });
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const [
          { data: profile },
          { data: allClips },
          { data: profileClips },
          { data: likedClips },
        ] = await Promise.all([
          axiosRequest.get(`profiles/${id}/`),
          axiosRequest.get("posts/"),
          axiosRequest.get(`posts/?owner__profile=${id}`),
          axiosRequest.get(`likes/?owner__profile=${id}`),
        ]);
        setProfile(profile);
        if (tab === "clips") setProfileClips(profileClips);
        if (tab === "liked") {
          const filteredClips = likedClips.results.reduce((acc, likedClip) => {
            const filtered = allClips.results.filter(
              (clip) => clip.id === likedClip.post
            );
            return acc.concat(filtered);
          }, []);
          setProfileClips({ results: [ ...filteredClips ]});
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    })();
  }, [id, tab]);

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
            className={`text-xl cursor-pointer text-gray-500 px-3.5 py-1.5 hover:text-gray-800 ${
              tab && clipsActive ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => {
              setTab("clips");
            }}
            onMouseEnter={() => {
              setClipsActive(true);
              setLikedActive(false);
            }}
            onMouseLeave={() => {
              if (tab !== "clips") {
                setClipsActive(false);
                setLikedActive(true);
              }
            }}
          >
            Clips
          </p>
          <p
            className={`text-xl cursor-pointer text-gray-500 px-3.5 py-1.5 ${
              tab && likedActive ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => setTab("liked")}
            onMouseEnter={() => {
              setClipsActive(false);
              setLikedActive(true);
            }}
            onMouseLeave={() => {
              if (tab === "clips") {
                setClipsActive(true);
                setLikedActive(false);
              }
            }}
          >
            Liked
          </p>
        </div>
        <div>
          {profileClips.results.length ? (
            profileClips.results.map((clip) => <p>{clip.id}</p>)
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
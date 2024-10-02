// React imports
import { useState, useEffect, useContext } from 'react';
// Dependencies imports
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Icons imports
import { GoVerified } from 'react-icons/go';
import { SlUserFollowing } from 'react-icons/sl';
// Components imports
import NoResults from '../NoResults';
import ClipPreview from '../clips/ClipPreview';
// Helpers imports
import { AppContext } from '../../context/AppContext';
import { axiosRequest } from '../../api/axiosDefaults';

const UserProfile = () => {
  const { id } = useParams();
  const { profiles, setProfiles, handleFollowClick, handleUnfollowClick } =
    useContext(AppContext);
  const [profileClips, setProfileClips] = useState({ results: [] });
  const [clipsActive, setClipsActive] = useState(true);
  const [likedActive, setLikedActive] = useState(false);
  const [tab, setTab] = useState('clips');

  useEffect(() => {
    (async () => {
      try {
        const { data: profile } = await axiosRequest.get(`/profiles/${id}/`);
        setProfiles((prevProfiles) => ({
          ...prevProfiles,
          pageProfile: { results: [profile] },
        }));

        if (tab === 'clips') {
          const { data: profileClips } = await axiosRequest.get(
            `clips/?owner__profile=${profile.id}`
          );
          setProfileClips(profileClips);
        }
        if (tab === 'liked') {
          const { data: likedClips } = await axiosRequest.get(
            `clips/?likes__owner__profile=${profile.id}&ordering=-likes__created_at&`
          );
          setProfileClips(likedClips);
        }
      } catch (error) {
        console.log('Error fetching user profile:', error);
      }
    })();
  }, [id, tab]);
  // Destructure page profile
  const {
    followers_count: followersCount,
    following_count: followingCount,
    following_id: followingId,
    image,
    id: profileId,
    is_owner: isOwner,
    name,
    owner,
  } = profiles.pageProfile.results[0] || {};
  const isFollowed = !isOwner && followingId;

  return (
    <div>
      <div className="flex items-center py-5">
        <Link to={`/profiles/${id}`}>
          <div
            className="
              size-28 bg-no-repeat bg-center bg-cover rounded-full 
              cursor-pointer
            "
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </Link>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col text-lg md:text-xl tracking-wider">
            <span className="flex items-center gap-1 font-semibold text-gray-800">
              @{owner} <GoVerified className="text-sm md:text-lg" />
            </span>
            <span className="text-sm text-gray-400">{name}</span>
          </div>
          {!isOwner && (
            <button
              className={`flex items-center justify-between max-w-fit border rounded text-lg
                ${
                  isFollowed
                    ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    : 'bg-gray-800 text-gray-50 border-gray-800 hover:bg-transparent hover:text-gray-800'
                }`}
              aria-label={isFollowed ? 'Unfollow profile' : 'Follow profile'}
              onClick={() =>
                isFollowed
                  ? handleUnfollowClick(followingId)
                  : handleFollowClick(profileId)
              }
            >
              {isFollowed ? (
                <span className="flex gap-1 items-center text-xs px-2.5 py-1">
                  <SlUserFollowing className="text-sm" />
                  Following
                </span>
              ) : (
                <span className="text-xs px-2.5 py-1">Follow</span>
              )}
            </button>
          )}
          <div className="flex gap-2 text-xs text-gray-500">
            <p>
              <strong className="text-gray-800">{followersCount || 0}</strong>{' '}
              <span>Following</span>
            </p>
            <p>
              <strong className="text-gray-800">{followingCount || 0}</strong>{' '}
              <span>Followers</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-2 border-b border-gray-200">
          <p
            className={`
              text-xl cursor-pointer text-gray-500 px-3.5 py-1.5 
              hover:text-gray-800 ${
                tab && clipsActive ? 'border-b-2 border-gray-800' : ''
              }
            `}
            onClick={() => setTab('clips')}
            onMouseEnter={() => {
              setClipsActive(true);
              setLikedActive(false);
            }}
            onMouseLeave={() => {
              if (tab !== 'clips') {
                setClipsActive(false);
                setLikedActive(true);
              }
            }}
          >
            Clips
          </p>
          <p
            className={`
              text-xl cursor-pointer text-gray-500 px-3.5 py-1.5 
              ${tab && likedActive ? 'border-b-2 border-gray-800' : ''}
            `}
            onClick={() => setTab('liked')}
            onMouseEnter={() => {
              setClipsActive(false);
              setLikedActive(true);
            }}
            onMouseLeave={() => {
              if (tab === 'clips') {
                setClipsActive(true);
                setLikedActive(false);
              }
            }}
          >
            Liked
          </p>
        </div>
        <div className="flex flex-col gap-10 h-full py-10">
          {profileClips.results.length ? (
            <div
              className="grid grid-cols-1 p-2 justify-center 
                sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {profileClips.results.map((clip) => (
                <ClipPreview key={clip.id} clip={clip} />
              ))}
            </div>
          ) : (
            <NoResults message="No videos just yet :/" noClips />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

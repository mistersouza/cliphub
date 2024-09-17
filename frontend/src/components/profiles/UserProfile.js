// React imports
import { useState, useEffect } from 'react';
// Dependacies imports
import { useParams } from 'react-router-dom';
// Icons imports
import { GoVerified } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { axiosRequest } from '../../api/axiosDefaults';
// Components imports
import NoResults from '../NoResults';
import ClipPreview from '../clips/ClipPreview';

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [tab, setTab] = useState('clips');
  const [clipsActive, setClipsActive] = useState(true);
  const [likedActive, setLikedActive] = useState(false);
  const [profileClips, setProfileClips] = useState({ results: [] });
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data: profile } = await axiosRequest.get(`profiles/${id}/`);
        setProfile(profile);

        if (tab === 'clips') {
          const { data: profileClips } = await axiosRequest.get(
            `clips/?owner__profile=${id}`
          );
          setProfileClips(profileClips);
        }
        if (tab === 'liked') {
          const { data: likedClipsIds } = await axiosRequest.get(
            `likes/?owner__profile=${id}`
          );
          // Shoutout to ChatGPT for the assist on this snazzy API-fetching magic.
          const likedClips = await Promise.all(
            likedClipsIds.results.map(async (clipId) => {
              const { data: clipDetails } = await axiosRequest.get(
                `clips/${clipId.clip}/`
              );
              return clipDetails;
            })
          );
          setProfileClips({ results: likedClips });
        }
      } catch (error) {
        console.log('Error fetching user profile:', error);
      }
    })();
  }, [id, tab]);

  return (
    <div>
      <div className="flex items-center py-5">
        <Link to={`/profiles/${id}`}>
          <div
            className="
              size-20 bg-no-repeat bg-center bg-cover rounded-full 
              cursor-pointer
            "
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
            <div className="grid grid-cols-1 p-2 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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

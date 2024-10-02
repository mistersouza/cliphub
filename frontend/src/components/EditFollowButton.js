import { useContext } from 'react';

import { SlUserFollowing } from 'react-icons/sl';
import { AppContext } from '../context/AppContext';

const EditFollowButton = ({ isOwner, profileId, followingId }) => {
  const { handleFollowClick, handleUnfollowClick } = useContext(AppContext);
  const isFollowed = !isOwner && Boolean(followingId);
  const handleButtonClick = () => {
    isOwner
      ? console.log('Feature comming soon')
      : isFollowed
        ? handleUnfollowClick(followingId)
        : handleFollowClick(profileId);
  };
  const ariaLabel = isOwner
    ? 'Edit profile'
    : isFollowed
      ? 'Unfollow profile'
      : 'Follow profile';

  const getButtonStyles = () => {
    const baseStyles =
      'flex items-center justify-between max-w-fit border rounded text-lg';

    if (isOwner)
      return `${baseStyles} bg-gray-800 text-gray-50 border-gray-800 hover:bg-transparent hover:text-gray-800`;

    return `${baseStyles} ${
      isFollowed
        ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        : 'bg-gray-800 text-gray-50 border-gray-800 hover:bg-transparent hover:text-gray-800'
    }`;
  };

  return (
    <button
      className={getButtonStyles()}
      aria-label={ariaLabel}
      onClick={handleButtonClick}
    >
      {isOwner ? (
        <span className="text-xs px-2.5 py-1">Edit profile</span>
      ) : (
        <>
          {isFollowed ? (
            <span className="flex gap-1 items-center text-xs px-2.5 py-1">
              <SlUserFollowing className="text-sm" />
              Following
            </span>
          ) : (
            <span className="text-xs px-2.5 py-1">Follow</span>
          )}
        </>
      )}
    </button>
  );
};

export default EditFollowButton;

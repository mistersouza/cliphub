// React imports
import { useContext } from 'react';
// Icons imports
import { SlUserFollowing } from 'react-icons/sl';
// Helpers imports
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

  /**
   * Returns the appropriate button styles based on ownership and follow status.
   * @function getButtonStyles
   * @returns {string} - A string of Tailwind CSS utility classes.
   * Base styles are always included, with additional styles applied conditionally
   */

  const getButtonStyles = () => {
    const baseStyles =
      'flex items-center justify-between px-2.5 py-1 max-w-fit border rounded text-base';
    const ownerStyles =
      'bg-gray-800 text-gray-50 border-gray-800 hover:bg-transparent hover:text-gray-800';

    if (isOwner) return `${baseStyles} ${ownerStyles}`;

    return `${baseStyles} ${
      isFollowed
        ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        : `${ownerStyles}`
    }`;
  };

  return (
    <button
      className={getButtonStyles()}
      aria-label={ariaLabel}
      onClick={handleButtonClick}
    >
      {isOwner ? (
        'Edit profile'
      ) : (
        <span className="flex gap-1.5 items-center">
          {isFollowed ? (
            <>
              <SlUserFollowing /> Following
            </>
          ) : (
            'Follow'
          )}
        </span>
      )}
    </button>
  );
};

export default EditFollowButton;

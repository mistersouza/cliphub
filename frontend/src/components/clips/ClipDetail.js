// React imports
import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Dependencies imports
import axios from 'axios';
// Icons imports
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel, MdFavorite } from 'react-icons/md';
import { FaCommentDots } from 'react-icons/fa';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { PiFlagPennantLight, PiDotsThreeVerticalBold } from 'react-icons/pi';
import { LuEye } from 'react-icons/lu';
// Components imports
import Avatar from '../Avatar';
import SmallDropdownMenu from '../dropdowns/SmallDropdownMenu';
// import Comments from '../comments/Comments';
import NoResults from '../NoResults';
// Helpers imports
import { axiosRequest, axiosResponse } from '../../api/axiosDefaults';
import { AppContext } from '../../context/AppContext';
import { useClickAway, useDisplay } from '../../utils/helpers';

const ClipDetail = () => {
  const { user, setClips } = useContext(AppContext);
  const [clip, setClip] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDropdownMenuDisplayed, toggleDropdownMenu] = useDisplay();
  const dropdownMenuRef = useClickAway(() => {
    if (isDropdownMenuDisplayed) toggleDropdownMenu();
  });
  const navigate = useNavigate();
  const clipRef = useRef(null);

  const [comments, setComments] = useState({ results: [] });
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosRequest.get(`clips/${id}`);
        setClip(data);
        setIsLiked(Boolean(data.like_id));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  const {
    comments_count: commentsCount,
    profile_id: profileId,
    profile_image: profileImage,
    likes_count: likesCount,
    like_id: likeId,
    views_count: viewsCount,
    owner,
    caption,
  } = clip;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosRequest.get(`comments/?clip=${id}`);
        setComments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setPosting(false);
      }
    })();
  }, [id]);

  const isOwner = user?.username === owner;

  const handleLikeClick = async () => {
    try {
      const { data } = await axiosResponse.post('likes/', { clip: id });
      setClips((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((clip) =>
          clip.id === id
            ? { ...clip, likes_count: clip.likes_count + 1, like_id: data.id }
            : clip
        ),
      }));
      setClip((prevClip) => ({
        ...prevClip,
        likes_count: prevClip.likes_count + 1,
        like_id: data.id,
      }));
      setIsLiked(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlikeClick = async () => {
    try {
      await axiosResponse.delete(`likes/${likeId}/`);
      setClips((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((clip) =>
          clip.id === id
            ? { ...clip, likes_count: clip.likes_count - 1, like_id: null }
            : clip
        ),
      }));
      setClip((prevClip) => ({
        ...prevClip,
        likes_count: prevClip.likes_count - 1,
      }));
      setIsLiked(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosResponse.post('comments/', {
        content,
        clip: id,
      });
      setPosting(true);
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setClip((prevClip) => ({
        ...prevClip,
        comments_count: prevClip.comments_count + 1,
      }));
      setContent('');
    } catch (error) {
      console.error(error);
    } finally {
      setPosting(false);
    }
  };

  const handlePlaybackClick = async () => {
    clipRef?.current[isPlaying ? 'pause' : 'play']();
    setIsPlaying((prev) => !prev);
    // Increment views only once per session
    if (!isPlaying && !isViewed) {
      try {
        await axios.post(`clips/${id}/play/`);
        setClip((prevClip) => ({
          ...prevClip,
          views_count: prevClip.views_count + 1,
        }));
        setIsViewed(true);
      } catch (error) {
        console.log('Error incrementing views', error);
      }
    }
  };

  const handleDeleteClick = async () => {
    try {
      const { status } = await axiosRequest.delete(`clips/${id}/`);
      if (status === 204) navigate(-1);
    } catch (error) {
      console.log('Error deleting clip', error);
    }
  };

  useEffect(() => {
    if (clipRef?.current) {
      clipRef.current.muted = isMuted;
    }
  }, [isMuted]);

  if (!clip) {
    return <NoResults message="This clip is no longer available :/" />;
  }

  return (
    <div
      className="fixed inset-0 bg-gray-50 flex flex-col lg:flex-row 
      lg:flex-nowrap"
    >
      <div
        className="relative w-full h-1/2 lg:w-9/12 lg:h-full flex 
        justify-center items-center bg-gray-800 backdrop-blur-sm"
      >
        <div
          className="opacity-90 absolute top-6 left-2 lg:left-6 flex 
          cursor-pointer z-50"
        >
          <MdOutlineCancel
            className="text-gray-500 text-3xl hover:opacity-90"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="relative">
          <div className="h-[60vh] lg:h-[100vh]">
            <video
              ref={clipRef}
              className="h-full cursor-pointer"
              onClick={handlePlaybackClick}
              src={clip.clip}
              aria-hidden="true"
              preload={'auto'}
            />
          </div>
          <div className="absolute top-[30%] md:top-28 lg:top-36 right-3 cursor-pointer">
            {isOwner ? (
              <PiDotsThreeVerticalBold
                className="text-white font-bold text-2xl md:text-3xl"
                aria-label="Dropdown menu"
                onMouseEnter={toggleDropdownMenu}
              />
            ) : (
              <PiFlagPennantLight
                className="text-white font-bold text-2xl md:text-3xl"
                aria-label="Flag clip"
                onMouseEnter={toggleDropdownMenu}
              />
            )}
            <SmallDropdownMenu
              dropdownMenuRef={dropdownMenuRef}
              id={id}
              isDropdownMenuDisplayed={isDropdownMenuDisplayed}
              isOwner={isOwner}
              handleDelete={handleDeleteClick}
            />
          </div>
          {/* Play/Pause button */}
          <div className="absolute top-[45%] left-[40%] cursor-pointer">
            <button
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onClick={handlePlaybackClick}
            >
              {isPlaying ? (
                <BsFillPauseFill
                  className="text-gray-200 text-6xl lg:text-8xl"
                  aria-hidden="true"
                />
              ) : (
                <BsFillPlayFill
                  className="text-gray-200 text-6xl lg:text-8xl"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
        {/* Mute/Unmute button */}
        <div className="absolute bottom-5 right-5 cursor-pointer lg:bottom-3 lg:right-5">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <HiVolumeOff className="text-gray-200 text-2xl lg:text-4xl" />
            ) : (
              <HiVolumeUp className="text-gray-200 text-2xl lg:text-4xl" />
            )}
          </button>
        </div>
      </div>
      {/* Details section */}
      <div className="relative flex flex-col h-1/2 w-full lg:w-3/12 lg:h-full">
        <div className="min-h-fit flex flex-col py-3 gap-2 md:gap-5">
          {/* User details */}
          <div className="flex items-center gap-3 px-3">
            <Avatar id={profileId} src={profileImage} />
            <div className="flex flex-col">
              <p className="flex items-center gap-1.5">
                <span className="text-sm text-gray-800 capitalize font-semibold">
                  {owner}
                </span>
                <GoVerified />
              </p>
              <p className="text-sm text-gray-500">{owner}_user</p>
            </div>
          </div>
          {/* Clip details */}
          <p className="text-sm text-gray-700 md:text-lg px-3.5">{caption}</p>
          {/* Likes, comments, views */}
          <div
            className="flex gap-5 items-center justify-center text-gray-700 
            text-sm py-1 md:py-3 md:mt-auto md:text-lg"
          >
            <div className="flex flex-col gap-1 items-center">
              <button
                className="bg-gray-200 rounded-full p-1 md:p-2"
                aria-label={isLiked ? 'Unlike this clip' : 'Like this clip'}
                onClick={isLiked ? handleUnlikeClick : handleLikeClick}
                disabled={isOwner}
              >
                <MdFavorite className={isLiked ? '' : 'text-gray-400'} />
              </button>
              <p className="text-xs">{likesCount || 0}</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div
                className={`bg-gray-200 rounded-full p-1 md:p-2 ${
                  !commentsCount ? 'text-gray-400' : ''
                }`}
                role="img"
                aria-hidden="true"
              >
                <FaCommentDots />
              </div>
              <p className="text-xs">
                <span className="sr-only">Comments count: </span>
                {commentsCount || 0}
              </p>
            </div>

            <div className="flex flex-col gap-1 items-center">
              <div
                className={`bg-gray-200 rounded-full p-1 md:p-2 ${
                  !viewsCount ? 'text-gray-400' : ''
                }`}
                role="img"
                aria-hidden="true"
              >
                <LuEye />
              </div>
              <p className="text-xs">
                <span className="sr-only">Views count: </span>
                {viewsCount || 0}
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto flex flex-col border-t-2 
            border-gray-200 bg-gray-100 lg:pb-0 pb-[100px]"
        >
          {comments.results.length ? (
            comments.results.map((comment) => (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5"
                key={comment.id}
              >
                <Avatar src={comment.profile_image} id={comment.profile_id} />
                <p className="text-sm font-light md:text-base lg:text-lg text-gray-800">
                  {comment.content}
                </p>
              </div>
            ))
          ) : (
            <NoResults
              message={`${
                !user
                  ? 'Log in and be the first to leave a comment'
                  : 'Be the first to leave a comment'
              }`}
              noComments
            />
          )}
        </div>
        <div className="w-full max-h-15 self-end">
          <div className="w-full p-3 border-t-2 border-gray-200">
            <form className="flex gap-2.5" onSubmit={handleCommentSubmit}>
              <input
                className="w-full bg-gray-100 rounded-md p-2 focus:ring-0 focus:outline-none"
                value={content}
                onChange={({ target }) => setContent(target.value)}
                placeholder={`${!user ? 'Log in to' : 'Add'} comment...`}
              />
              {user && (
                <button
                  className={`bg-gray-100 text-gray-${!content.trim() ? '200' : '700'} rounded-lg p-2`}
                  disabled={!content.trim()}
                  type="submit"
                >
                  {posting ? (
                    <div className="flex space-x-0.5 justify-center">
                      <span className="sr-only">Posting...</span>
                      <div
                        className="w-2.5 h-2.5 bg-gray-500 rounded-full 
                        animate-bounce [animation-delay:-0.3s]"
                      ></div>
                      <div
                        className="w-2.5 h-2.5 bg-gray-500 rounded-full 
                        animate-bounce [animation-delay:-0.15s]"
                      ></div>
                      <div
                        className="w-2.5 h-2.5 bg-gray-500 rounded-full 
                        animate-bounce"
                      ></div>
                    </div>
                  ) : (
                    <p>Post</p>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClipDetail;

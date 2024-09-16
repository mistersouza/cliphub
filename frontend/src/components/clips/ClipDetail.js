// React imports
import { useEffect, useRef, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// Dependencies imports
import axios from 'axios';
// Icons imports
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel, MdFavorite } from 'react-icons/md';
import { FaCommentDots } from 'react-icons/fa';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { PiFlagPennantLight } from 'react-icons/pi';

// Components imports
import Avatar from '../Avatar';
// import Comments from '../comments/Comments';
import NoResults from '../NoResults';
import DropdownMenu from '../DropdownMenu';
// Helpers imports
import { axiosRequest, axiosResponse } from '../../api/axiosDefaults';
import { AppContext } from '../../context/AppContext';
import { useDisplay } from '../../utils/helpers';

const ClipDetail = () => {
  const { user, setClips } = useContext(AppContext);
  const [isDropdownMenuDisplayed, toggleDropdownMenuDisplay] = useDisplay();
  const [clip, setClip] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [reasons, setReasons] = useState([]);

  const navigate = useNavigate();
  const clipRef = useRef(null);
  const [comments, setComments] = useState({ results: [] });

  const { id } = useParams();

  useEffect(() => {
    const fetchClip = async () => {
      try {
        const { data } = await axiosRequest.get(`clips/${id}`);
        console.log('Clip details', data);

        setClip(data);
        setIsLiked(Boolean(data.like_id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchClip();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axiosRequest.get(`comments/?clip=${id}`);
        setComments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setPosting(false);
      }
    };
    fetchComments();
  }, [id]);

  const {
    comments_count: commentsCount,
    profile_image: profileImage,
    likes_count: likesCount,
    like_id: likeId,
    // views_count: viewsCount,
    owner,
  } = clip;

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
      setIsLiked(!!data.id);
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
    // Toggle play/pause
    clipRef?.current[isPlaying ? 'pause' : 'play']();
    setIsPlaying((prev) => !prev);
    // Increment views only once per session
    if (!isPlaying && !isViewed) {
      try {
        await axios.post(`clips/${id}/play/`);
        setIsViewed(true);
      } catch (error) {
        console.log('Error incrementing views', error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosResponse.get('flag/reasons/');
        setReasons(data);
        data.reasons.forEach((reason) => console.log(reason));
      } catch (error) {
        console.log('Error fetching reasons', error);
      }
    })();
  }, []);

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
              loop
            />
          </div>
          <div
            className="absolute top-24 right-3 text-white font-bold text-3xl 
            cursor-pointer"
          >
            <button onClick={toggleDropdownMenuDisplay}>
              <PiFlagPennantLight className="opacity-50" />
              <DropdownMenu
                menu={isDropdownMenuDisplayed}
                handleDropdownMenu={toggleDropdownMenuDisplay}
              />
            </button>
          </div>
          <div className="absolute top-[45%] left-[40%] cursor-pointer">
            <button onClick={handlePlaybackClick}>
              {isPlaying ? (
                <BsFillPauseFill className="text-gray-200 text-6xl lg:text-8xl" />
              ) : (
                <BsFillPlayFill className="text-gray-200 text-6xl lg:text-8xl" />
              )}
            </button>
          </div>
        </div>
        <div className="absolute bottom-5 right-5 cursor-pointer lg:bottom-3 lg:right-5">
          {isMuted ? (
            <button onClick={() => setIsMuted((prev) => !prev)}>
              <HiVolumeOff className="text-gray-200 text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsMuted((prev) => !prev)}>
              <HiVolumeUp className="text-gray-200 text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="relative flex flex-col h-1/2 w-full lg:w-3/12 lg:h-full">
        <div className="min-h-fit flex flex-col py-3 gap-2 md:gap-5">
          <div className="flex items-center gap-3 px-3">
            <Link to="/">
              <Avatar src={clip.profile_image} />
            </Link>
            <div className="flex flex-col">
              <p className="flex items-center gap-1.5">
                <span className="text-sm text-gray-800 capitalize font-semibold">
                  {clip.owner}
                </span>
                <GoVerified />
              </p>
              <p className="text-sm text-gray-500">{owner}_user</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 md:text-lg px-3.5">
            {clip.caption}
          </p>
          <div
            className="flex gap-2 items-center justify-center text-gray-700 
            text-sm py-1 md:py-3 md:mt-auto md:text-lg"
          >
            <button
              className="bg-gray-200 rounded-full p-1 md:p-2"
              onClick={isLiked ? handleUnlikeClick : handleLikeClick}
              disabled={isOwner}
            >
              <MdFavorite className={isLiked ? '' : 'text-gray-400'} />
            </button>
            <p>{likesCount || 0}</p>
            <div className="flex gap-3 items-center">
              <div
                className={`bg-gray-200 rounded-full p-1 md:p-2 ${
                  !commentsCount ? 'text-gray-400' : ''
                }`}
              >
                <FaCommentDots />
              </div>
              <p>{commentsCount || 0}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col border-t-2 border-gray-200 bg-gray-100 lg:pb-0 pb-[100px]">
          {comments.results.length ? (
            comments.results.map((comment) => (
              <div
                className="flex items-center gap-1.5 px-3 py-1"
                key={comment.id}
              >
                <Avatar src={comment.profile_image || profileImage} />
                <p className="text-sm font-light md:text-base lg:text-lg text-gray-800">
                  {comment.content}
                </p>
              </div>
            ))
          ) : (
            <NoResults
              message={`${!user ? 'Log in and be the first to leave a comment' : 'Be the first to leave a comment'}`}
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
                      <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></div>
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

import { useEffect, useRef, useState, useContext } from "react";
import { GoVerified } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineCancel, MdFavorite } from "react-icons/md";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import { axiosRequest, axiosResponse } from "../../api/axiosDefaults";
import { AppContext } from "../../context/AppContext";
import NoResults from "../NoResults";
import Avatar from "../Avatar";
import Comment from "../comments/Comment";

const ClipDetail = () => {
  const { setPosts } = useContext(AppContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const clipRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data: post } = await axiosRequest.get(`/posts/${id}`);
        setPost({ ...post });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  console.log("post", post);

  const handLikeClick = async () => {
    try {
      const { data } = await axiosResponse.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaybackClick = () => {
    clipRef?.current[isPlaying ? "pause" : "play"]();
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (clipRef?.current) clipRef.current.muted = isMuted;
  }, [isMuted]);

  if (!post)
    return <NoResults message={"This clip is no longer avaliable :/"} />;

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-wrap lg:flex-nowrap">
      <div className="relative w-9/12 flex justify-center items-center bg-gray-800 backdrop-blur-sm">
        <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex cursor-pointer z-50">
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
              src="https://res.cloudinary.com/dhlhrakma/video/upload/v1674824164/samples/cld-sample-video.mp4"
              loop
            ></video>
          </div>
          <div className="absolute top-[45%] left-[40%] cursor-pointer">
            {!isPlaying ? (
              <button onClick={handlePlaybackClick}>
                <BsFillPlayFill className="text-gray-200 text-6xl lg:text-8xl" />
              </button>
            ) : (
              <button
                onClick={handlePlaybackClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <BsFillPauseFill
                  className={`text-6xl lg:text-8xl ${
                    isHovered ? "text-gray-200" : "text-transparent"
                  }`}
                />
              </button>
            )}
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
      <div className="relative w-3/12">
        <div className="flex items-center gap-1.5 p-3">
          <Link to={"/"}>
            <Avatar src={post.profile_image} size={12} />
          </Link>
          <div className="flex flex-col">
            <p className="flex items-center gap-1.5">
              <span className="text-sm text-gray-800 capitalize font-semibold">
                {post.owner}
              </span>
              <GoVerified />
            </p>
            <p className="text-xs text-gray-500">fabio_ortega</p>
          </div>
        </div>
        <p className="text-sm text-gray-800 px-5">{post.caption}</p>
        <div>
          <div>
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <button
                className="bg-gray-200 rounded-full p-1 md:p-2 text-gray-800"
                onClick={handLikeClick}
              >
                <MdFavorite className="text-base md:text-lg" />
              </button>
            </div>
          </div>
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default ClipDetail;

{
  /* <img
              className="h-full cursor-pointer"
              onClick={() => {}}
              // loop
              ref={clipRef}
              src={results[0].clip}
            /> */
}

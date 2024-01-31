import { useEffect, useRef, useState } from "react";
import { GoVerified } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import { axiosRequest } from "../../api/axiosDefaults";
import NoResults from "../NoResults";

const ClipDetail = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [post, setPost] = useState({ results: [] });
  const navigate = useNavigate();
  const clipRef = useRef(null);
  const { id } = useParams();
  const { results } = post;
  useEffect(() => {
    (async () => {
      try {
        const { data: post } = await axiosRequest.get(`/posts/${id}`);
        setPost({ results: [post] });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const handlePlaybackClick = () => {
    clipRef?.current[isPlaying ? "pause" : "play"]();
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (clipRef?.current) clipRef.current.muted = isMuted;
  }, [isMuted]);

  if (!results.length)
    return <NoResults message={"This clip is no longer avaliable :/"} />;

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-gray-800 backdrop-blur-sm">
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
        <div className="absolute bottom-5 right-5 cursor-pointer lg:bottom-10 lg:right-5">
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

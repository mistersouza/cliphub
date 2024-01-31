import { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

const ClipCard = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const clipRef = useRef(null);

  const handlePlaybackClick = () => {
    clipRef?.current[isPlaying ? "pause" : "play"]();
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (clipRef?.current) clipRef.current.muted = isMuted;
  }, [isMuted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="w-10 h-10 md:w-10 md:h-16">
            <Link to={'/'}>
              <img
                className="w-16 object-cover rounded-full"
                src={post.profile_image}
                alt={`${post.owner}'s profile`}
              />
            </Link>
          </div>
          <div>
            <Link to="/">
              <div>
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.owner} <GoVerified className="text-gray-800 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.owner}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-4 relative lg:ml-20">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to={`/posts/${post.id}`}>
            <img
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100 z-0"
              ref={clipRef}
              src={post.clip}
            />
          </Link>
          {isHovered && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3">
              {isPlaying ? (
                <button onClick={handlePlaybackClick}>
                  <BsFillPauseFill className="text-2xl text-gray-800 lg:text-4xl" />
                </button>
              ) : (
                <button onClick={handlePlaybackClick}>
                  <BsFillPlayFill className="text-2xl text-gray-800 lg:text-4xl" />
                </button>
              )}
              {isMuted ? (
                <button onClick={() => setIsMuted((prev) => !prev)}>
                  <HiVolumeOff className="text-gray-800 text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsMuted((prev) => !prev)}>
                  <HiVolumeUp className="text-gray-800 text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClipCard;

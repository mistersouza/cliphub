// React imports
import { useState, useEffect, useRef } from 'react';
// Dependencies imports
import { Link } from 'react-router-dom';
// Icons imports
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
// Components imports
import Avatar from '../Avatar';

const ClipCard = ({ clip }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const clipRef = useRef(null);

  const handlePlaybackClick = () => {
    clipRef?.current[isPlaying ? 'pause' : 'play']();
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (clipRef?.current) clipRef.current.muted = isMuted;
  }, [isMuted]);

  if (!clip) return null;

  return (
    <div className="flex flex-col pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <Avatar src={clip.profile_image} id={clip.profile_id} />
          <div>
            <div>
              <p
                className="capitalize flex gap-2 items-center 
                  md:text-md font-bold text-primary"
              >
                {clip.owner} <GoVerified className="text-gray-800 text-md" />
              </p>
              <p className="font-medium text-xs text-gray-500 hidden md:block">
                @{clip.owner}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 relative lg:ml-20">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link
            to={`/clips/${clip?.id}`}
            aria-label={`Join the conversation and show love for ${clip?.id}`}
            title={clip.id}
          >
            <video
              ref={clipRef}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px]
                w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              aria-labelledby={`clip-${clip?.id}-title`}
            >
              <source src={clip.clip} type="video/mp4" />
              <track
                kind="captions"
                srcLang="en"
                src={`data:text/vtt;charset=utf-8,${clip?.caption}`}
                label="English"
              />
              Your browser does not support video tags :/
            </video>
          </Link>
          {isHovered && (
            <div
              className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0
                flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3"
            >
              {isPlaying ? (
                <button onClick={handlePlaybackClick} aria-label="Pause video">
                  <BsFillPauseFill className="text-2xl text-gray-800 lg:text-4xl" />
                </button>
              ) : (
                <button onClick={handlePlaybackClick} aria-label="Play video">
                  <BsFillPlayFill className="text-2xl text-gray-800 lg:text-4xl" />
                </button>
              )}
              {isMuted ? (
                <button
                  onClick={() => setIsMuted((prev) => !prev)}
                  aria-label="Unmute video"
                >
                  <HiVolumeOff className="text-gray-800 text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button
                  onClick={() => setIsMuted((prev) => !prev)}
                  aria-label="Mute video"
                >
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

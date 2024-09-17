// React imports
import { useState, useRef } from 'react';
// Dependacies imoprts
import { Link } from 'react-router-dom';
// Icons imports
import { BsPlay } from 'react-icons/bs';

const ClipPreview = ({ clip }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const clipRef = useRef(null);

  const handlePlaybackClick = () => {
    clipRef?.current[isPlaying ? 'pause' : 'play']();
    setIsPlaying((prev) => !prev);
    setIsHovered((prev) => !prev);
  };

  if (!clip) return null;

  return (
    <Link className="w-fit mx-auto" to={`/clips/${clip.id}`} key={clip.id}>
      <div
        className="relative bg-cover bg-center h-80 lg:h-60 rounded"
        onMouseEnter={handlePlaybackClick}
        onMouseLeave={handlePlaybackClick}
      >
        <video
          ref={clipRef}
          className="w-full max-w-[200px] h-full object-cover rounded"
          loop
        >
          <source src={clip.clip} type="video/mp4" />
          Your browser does not support video tags :/
        </video>
        {isHovered && (
          <div
            className="absolute inset-0 flex items-center justify-between 
              rounded p-1 bg-black bg-opacity-50"
          >
            <div
              className={`${
                !clip.views_count > 0
                  ? 'hidden'
                  : 'absolute bottom-3 right-3 flex items-center text-gray-50'
              }`}
            >
              <BsPlay className="text-2xl" />
              <span className="text-lg">{clip.views_count}</span>
            </div>
          </div>
        )}
      </div>
      <p className="p-1.5 text-sm text-gray-500">{clip.caption}</p>
    </Link>
  );
};

export default ClipPreview;

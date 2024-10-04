// React imports
import { useState, useRef } from 'react';
// Depedacies imports
import { useNavigate } from 'react-router-dom';
// Icons imports
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
// Components imports
import AsyncLoader from '../AsyncLoader';
// Helpers
import { axiosRequest } from '../../api/axiosDefaults';
// Misc imports
import { topics } from '../../utils/constants';

const ClipUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [savingClip, setSavingClip] = useState(false);
  const [clipData, setClipData] = useState({
    caption: '',
    topic: '',
    clip: '',
  });
  const { caption, topic, clip } = clipData;
  const clipRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = ({ target }) => {
    setClipData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleClipChange = (event) => {
    setIsLoading(true);
    if (event.target.files.length) {
      URL.revokeObjectURL(clip);
      setClipData((prevState) => ({
        ...prevState,
        clip: URL.createObjectURL(event.target.files[0]),
      }));
    }
    setIsLoading(false);
  };

  const handleDiscardClick = () => {
    setClipData((prevState) => ({
      ...prevState,
      clip: '',
    }));
  };

  const handleClipSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('topic', topic);
    formData.append('clip', clipRef.current.files[0]);

    try {
      await axiosRequest.post('/clips/', formData);
      setSavingClip(true);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error('Error uploading clip', error.response?.data || error);
      }
    } finally {
      setSavingClip(false);
      navigate('/');
    }
  };

  return (
    <div
      className="flex justify-center h-full w-full absolute top-[60]
      left-0 pt-10 lg:pt-20 bg-gray-200 mb-10"
    >
      <form
        onSubmit={handleClipSubmit}
        className="bg-white rounded-lg xl:h-[80vh] flex gap-6
          flex-wrap justify-center items-center p-14 pt-6"
      >
        <div>
          <div className="flex flex-col items-center gap-1 py-5">
            <p className="text-2xl font-bold">Upload a clip</p>
            <p className="text-md text-gray-500">Post a clip to your account</p>
          </div>
          <div
            className="flex flex-col justify-center items-center border-dashed
            border-4 border-gray-200 rounded-xl outline-none w-[260px] h-[458px]
            p-3 cursor-pointer hover:border-gray-800 hover:bg-gray-100"
          >
            {isLoading ? (
              <AsyncLoader size={'md'} />
            ) : (
              <div className="w-full h-full flex items-center justify-center relative">
                {clip ? (
                  <video
                    className="flex h-full w-full object-contain bg-black rounded-md"
                    controls
                  >
                    <source src={clip} type="video/mp4" />
                    Your browser does not support video tags :/
                  </video>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <label htmlFor="dropzone">
                      <div
                        className="flex flex-col items-center justify-center
                        gap-3"
                      >
                        <FaCloudUploadAlt className="text-gray-500 text-6xl" />
                        <p className="flex flex-col text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>
                          <span>or drag and drop</span>
                        </p>
                        <p className="text-xs text-gray-500 text-center">
                          MP4 only (MAX. 800x400px)
                        </p>
                      </div>
                    </label>
                  </div>
                )}
                <input
                  className="hidden"
                  type="file"
                  id="dropzone"
                  name="clip"
                  onChange={handleClipChange}
                  ref={clipRef}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            name="caption"
            value={caption}
            onChange={handleInputChange}
            className="rounded lg:after:w-650 outline-none text-md border-2
              border-gray-200 p-2"
          />
          <label className="text-md font-medium">Choose a topic</label>
          <div className="relative rounded lg:w-650 border-2 border-gray-200">
            <select
              name="topic"
              value={topic}
              onChange={handleInputChange}
              className="outline-none appearance-none w-full text-md capitalize lg:p-3 p-2
                cursor-pointer"
            >
              {topics.map((topic) => (
                <option
                  className="outline-none capitalize bg-white text-gray-700 text-md
                    p-2 hover:bg-gray-100"
                  key={topic.name}
                  value={topic.name}
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <div
              className="absolute inset-y-0 right-0 flex items-center px-2
              pointer-events-none"
            >
              <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-500" />
            </div>
          </div>
          <div className="flex gap-6 mt-10">
            <button
              className="border-gray-300 border-2 text-md font-medium p-2 rounded
                w-28 lg:w-44 outline-none"
              onClick={handleDiscardClick}
              type="button"
            >
              Discard
            </button>
            <button
              className={`bg-${clip ? 'gray-800' : 'gray-500'} text-white text-md
                font-medium p-2 rounded w-28 lg:w-44 outline-none`}
              type="submit"
            >
              {savingClip ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClipUpload;

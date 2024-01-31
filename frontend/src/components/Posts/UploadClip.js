import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { axiosRequest } from "../../api/axiosDefaults";

import { topics } from "../../utils/constants";

const UploadClip = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [savingClip, setSavingClip] = useState(false);
  const [postData, setPostData] = useState({
    caption: "",
    topic: "",
    clip: "",
  });
  const { caption, topic, clip } = postData;
  // const clipRef = useRef();
  const navigate = useNavigate();

  const handleInputChange = ({ target }) => {
    setPostData({
      ...postData,
      [target.name]: target.value,
    });
  };

  const handleClipChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(clip);
      setPostData({
        ...postData,
        clip: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleClipSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("caption", caption );
    formData.append("topic", topic);
    // formData.append("clip", clipRef.current.files[0]);

    try {
      const { data } = await axiosRequest.post("/posts/", formData);
      navigate('/posts');
      setSavingClip(true);
    } catch (error) {
      // console.log(error);
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      }
    } finally {
      setSavingClip(false);
    }
  };

  return (
    <div className="flex justify-center h-full w-full absolute top-[60] left-0 pt-10 lg:pt-20 bg-gray-200 mb-10">
      <form onSubmit={handleClipSubmit} className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
        <div>
          <div className="flex flex-col items-center gap-1 py-5">
            <p className="text-2xl font-bold">Upload clip</p>
            <p className="text-md text-gray-500">
              Post a clip to your account
            </p>
          </div>
          <div className="flex flex-col justify-center items-center border-dashed border-4 border-gray-200 rounded-xl outline-none w-[260px] h-[458px] p-3 cursor-pointer hover:border-gray-800 hover:bg-gray-100">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {clip ? (
                  <div>
                    <figure className="flex flex-col justify-center h-[425px] bg-black">
                      <img src={clip} />
                    </figure>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <FaCloudUploadAlt className="text-gray-500 text-6xl" />
                        <p className="flex flex-col text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>
                          <span>or drag and drop</span>
                        </p>
                        <p className="text-xs text-gray-500 text-center">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      id="dropzone"
                      name="image"
                      onChange={handleClipChange}
                      // ref={clipRef}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium ">Caption</label>
          <input
            type="text"
            name="caption"
            value={caption}
            onChange={(event) => handleInputChange(event)}
            className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
          />
          <label className="text-md font-medium ">Choose a topic</label>
          <select
            name="topic"
            value={topic}
            onChange={handleInputChange}
            className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((topic) => (
              <option
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                key={topic.name}
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              onClick={() => {}}
              type="button"
            >
              Discard
            </button>
            <button
              className={`bg-${clip ? 'gray-800' : 'gray-500'} text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none`}
              // disabled={clip ? false : true}
              type="submit"
            >
              {savingClip ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadClip;
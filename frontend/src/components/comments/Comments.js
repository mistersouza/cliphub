import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoResults from "../NoResults";
import { AppContext } from "../../context/AppContext";
import { axiosRequest } from "../../api/axiosDefaults";

const Comments = ({ post }) => {
  // const { user } = useContext(AppContext);
  const user = true;
  const [posting, setPosting] = useState(true); 
  const [comments, setComments] = useState({ results: [] });

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data: comments } = await axiosRequest.get(
          `/comments/?post=${id}`
        );
        setComments(comments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  console.log("comments", comments);

  return (
    <div className="border-t-2 border-gray-200 bg-gray-100 border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-y-auto lg:h-[457px]">
        {comments.results.length ? (
          <p>comments</p>
        ) : (
          <NoResults
            message={"Be the first one to leave a comment"}
            noComments
          />
        )}
      </div>
      {user && (
        <div className="fixed bottom-0 right-0 w-3/12 p-3 bg-gray-100">
          <form className="flex gap-3" onSubmit={() => {}}>
            <input
              className="w-full p-1.5 text-md border border-gray-150 rounded-lg outline-none focus:border-gray-500"
              value={""}
              onChange={() => {}}
              placeholder="Add comment..."
            />
            <button
              className="text-gray-500"
              onClick={() => {}}
            >
              {posting ? (
                /* TailwindFlex code snipet */
                <div className="flex space-x-0.5 justify-center">
                  <span className="sr-only">Posting...</span>
                  <div className="size-1 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="size-1 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="size-1 bg-gray-500 rounded-full animate-bounce"></div>
                </div>
                 /* Code snipet ends*/
              ) : (
                <p className="text-sm font-semibold text-gray-500">Post</p>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;

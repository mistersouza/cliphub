import { useState, useEffect, useContext } from "react";
import { axiosRequest } from "../../api/axiosDefaults";

import NoResults from "../NoResults";
import PostCard from "./PostCard";
import { AppContext } from "../../context/AppContext";

const Feed = () => {
  const { user } = useContext(AppContext); 
  const [posts, setPosts] = useState({ results: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosRequest.get("/posts/");
        setPosts(data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-10 h-full gap-10 w-full">
      {posts.results?.length ? (
        posts.results.map((post) => (
          <PostCard post={post} key={post.id} />
        ))
      ) : (
        <NoResults message="No videos just yet :/" />
      )}
    </div>
  );
};

export default Feed;
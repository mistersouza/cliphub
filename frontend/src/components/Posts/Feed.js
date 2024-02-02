import { useState, useEffect, useContext } from "react";
import { axiosRequest } from "../../api/axiosDefaults";

import NoResults from "../NoResults";
import ClipCard from "./ClipCard";
import { AppContext } from "../../context/AppContext";

const Feed = () => {
  const { user, posts, setPosts } = useContext(AppContext); 
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

  console.log('posts', posts);
  return (
    <div className="flex flex-col gap-10 h-full gap-10 w-full">
      {posts.results?.length ? (
        posts.results.map((post) => (
          <ClipCard key={post.id} post={post}/>
        ))
      ) : (
        <NoResults message="No videos just yet :/" />
      )}
    </div>
  );
};

export default Feed;
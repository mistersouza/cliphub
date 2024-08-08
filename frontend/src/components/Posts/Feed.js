import { useState, useEffect, useContext } from "react";
import { axiosRequest } from "../../api/axiosDefaults";

import NoResults from "../NoResults";
import ClipCard from "./ClipCard";
import { AppContext } from "../../context/AppContext";

const Feed = ({ filter='' }) => {
  const { user, posts, setPosts, query } = useContext(AppContext); 
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `/posts/?${filter}`
        if (query) url += `search=${query}`;
        const { data } = await axiosRequest.get(url);
        setPosts(data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    setIsLoaded(false); 
    fetchData();
  }, [filter, query]);
  
  return (
    <div className="flex flex-col gap-10 h-full gap-10 w-full">
      {posts.results?.length ? (
        posts.results.map((post) => (
          <ClipCard key={post.id} post={post}/>
        ))
      ) : (
        <NoResults message="No videos just yet :/" noClips />
      )}
    </div>
  );
};

export default Feed;
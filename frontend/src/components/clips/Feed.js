import { useState, useEffect, useContext } from 'react';
import { axiosRequest } from '../../api/axiosDefaults';
import NoResults from '../NoResults';
import ClipCard from './ClipCard';
import { AppContext } from '../../context/AppContext';

const Feed = ({ filter = '' }) => {
  const { user, clips, setClips, query } = useContext(AppContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `clips/?${filter}`;
        if (query) url += `search=${query}`;
        const { data } = await axiosRequest.get(url);
        console.log('Clips list', data);

        setClips(data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setIsLoaded(false);
    fetchData();
  }, [filter, query, setClips]);

  return (
    <div className="flex flex-col gap-10 h-full w-full overflow-auto scrollbar-hide">
      {clips.results?.length ? (
        clips.results.map((clip) => <ClipCard key={clip.id} clip={clip} />)
      ) : (
        <NoResults message="No videos just yet :/" noClips />
      )}
    </div>
  );
};

export default Feed;

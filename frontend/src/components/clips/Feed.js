// React imports
import { useEffect, useContext } from 'react';
// Components imports
import NoResults from '../NoResults';
import ClipCard from './ClipCard';
// Helpers imports
import { AppContext } from '../../context/AppContext';
import { axiosRequest } from '../../api/axiosDefaults';

const Feed = ({ filter = '' }) => {
  const { clips, setClips, query } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `clips/?${filter}`;
        if (query) url += `search=${query}`;
        const { data } = await axiosRequest.get(url);
        setClips(data);
        // console.log('Clips list', data);
      } catch (error) {
        console.log(error);
      }
    };
    // Debounce the API call
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [filter, query]);

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

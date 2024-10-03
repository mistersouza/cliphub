// React imports
import { useEffect, useContext, useMemo } from 'react';
// Components imports
import NoResults from '../NoResults';
import ClipCard from './ClipCard';
// Helpers imports
import { AppContext } from '../../context/AppContext';
import { axiosRequest } from '../../api/axiosDefaults';
import { useDebounce } from '../../utils/helpers';

const Feed = ({ filter = '' }) => {
  const { clips, setClips, query } = useContext(AppContext);
  // Debouce API Calls
  const debouncedQuery = useDebounce(query, 500);

  const url = useMemo(() => {
    let baseUrl = `clips/?${filter}`;
    if (debouncedQuery) baseUrl += `search=${query}`;
    return baseUrl;
  }, [filter, debouncedQuery]);

  const featuredClips = useMemo(
    () => clips.results?.map((clip) => <ClipCard key={clip.id} clip={clip} />),
    [clips.results]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosRequest.get(url);
        setClips(data);
        // console.log('Clips list', data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [filter, query]);

  return (
    <div className="flex flex-col gap-10 h-full w-full overflow-auto scrollbar-hide">
      {clips.results?.length ? (
        featuredClips
      ) : (
        <NoResults message="No videos just yet :/" noClips />
      )}
    </div>
  );
};

export default Feed;

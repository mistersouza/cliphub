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

  const featuredClips = useMemo(
    () => clips.results?.map((clip) => <ClipCard key={clip.id} clip={clip} />),
    [clips.results]
  );

  useEffect(() => {
    (async () => {
      let url = `clips/?${filter}`;
      if (debouncedQuery) url += `search=${query}`;

      try {
        const { data } = await axiosRequest.get(url);
        setClips(data);
      } catch (error) {
        console.error('Error fetching clips', error);
      }
    })();
  }, [filter, debouncedQuery]);

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

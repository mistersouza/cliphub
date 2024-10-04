// React imports
import { createContext, useEffect, useState } from 'react';
// Dependacies imports
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Helpes imports
import { axiosRequest, axiosResponse } from '../api/axiosDefaults';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/helpers';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [clips, setClips] = useState({ results: [] });
  const [profiles, setProfiles] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  /**
   * Handles the follow action for a user profile.
   * @param {string} profileId - The profile ID to follow.
   * @returns {Promise<void>} A promise that resolves when the follow action is completed.
   */
  const handleFollowClick = async (profileId) => {
    try {
      const { data } = await axiosResponse.post('/followers/', {
        followed_by: profileId,
      });
      setProfiles((prevProfiles) => ({
        ...prevProfiles,
        pageProfile: {
          ...prevProfiles.pageProfile,
          results: prevProfiles.pageProfile.results.map((profile) => ({
            ...profile,
            followers_count: profile.followers_count + 1,
            following_id: data.id,
          })),
        },
      }));
    } catch (error) {
      console.error('Error following profile', error.response || error);
    }
  };

  /**
   * Handles the unfollow action for a user profile.
   * @param {string} followingId - The profile ID to unfollow.
   * @returns {Promise<void>} A promise that resolves when the unfollow action is completed.
   */
  const handleUnfollowClick = async (followingId) => {
    if (!followingId) return;
    try {
      const { status } = await axiosRequest.delete(
        `/followers/${followingId}/`
      );
      if (status === 204) {
        setProfiles((prevProfiles) => ({
          ...prevProfiles,
          pageProfile: {
            ...prevProfiles.pageProfile,
            results: prevProfiles.pageProfile.results.map((profile) => ({
              ...profile,
              followers_count: profile.followers_count - 1,
              following_id: null,
            })),
          },
        }));
      }
      if (status !== 204)
        console.warn(`Whoa! Status ${status} received instead of 204.`);
    } catch (error) {
      console.error('Error unfollowing profile', error.response || error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosResponse.get('dj-rest-auth/user/');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
      try {
        const { data: profiles } = await axiosRequest.get('profiles/');
        setProfiles((prevProfiles) => ({
          ...prevProfiles,
          popularProfiles: profiles,
        }));
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    })();
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosRequest.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post('dj-rest-auth/token/refresh/');
          } catch (error) {
            setUser((prevUser) => {
              if (prevUser) {
                navigate('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosResponse.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await axios.post('dj-rest-auth/token/refresh/');
            return axios(error.config);
          } catch (error) {
            setUser((prevUser) => {
              if (prevUser) {
                navigate('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
          }
        }
        return axios(error.config);
      }
    );

    // Remove interceptors when component unmounts
    return () => {
      axiosRequest.interceptors.request.eject(requestInterceptor);
      axiosResponse.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  const context = {
    user,
    setUser,
    profiles,
    setProfiles,
    clips,
    setClips,
    query,
    setQuery,
    handleFollowClick,
    handleUnfollowClick,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };

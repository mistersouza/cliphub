// React imports
import { createContext, useEffect, useState, useMemo } from 'react';
// Dependacies imports
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Helpes imports
import { axiosRequest, axiosResponse } from '../api/axiosDefaults';

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

  const handleFollowClick = async (profileId) => {
    try {
      const { data } = await axiosResponse.post('/followers/', {
        followed_by: profileId,
      });
      setProfiles((prevProfiles) => {
        return {
          ...prevProfiles,
          pageProfile: {
            ...prevProfiles.pageProfile,
            results: prevProfiles.pageProfile.results.map((profile) => {
              if (profile.id === profileId) {
                return {
                  ...profile,
                  followers_count: profile.followers_count + 1,
                  following_id: data.id,
                };
              }
              return profile;
            }),
          },
        };
      });
    } catch (error) {
      console.error('Error following profile', error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosResponse.get('dj-rest-auth/user/');
        setUser(data);
      } catch (error) {
        console.log('Error fetching user:', error);
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

  useMemo(() => {
    axiosRequest.interceptors.request.use(
      async (config) => {
        try {
          await axios.post('dj-rest-auth/token/refresh/');
        } catch (err) {
          setUser((prevUser) => {
            if (prevUser) {
              navigate('/signin');
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosResponse.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            // Attempt to refresh the token
            await axios.post('dj-rest-auth/token/refresh/');
            // Retry the original request
            return axios(err.config);
          } catch (error) {
            // If refreshing the token fails, log out the user
            setUser((prevUser) => {
              if (prevUser) {
                navigate('/signin');
              }
              return null;
            });
          }
        }
        return Promise.reject(err);
      }
    );
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
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };

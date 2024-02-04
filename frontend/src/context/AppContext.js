import { createContext, useEffect, useState } from "react";
import { axiosResponse } from "../api/axiosDefaults";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState({ results: [] });
  const [profiles, setProfiles] = useState({
    profiles: { results: [] },
  });

  useEffect(() => {
    (async () => {
      try {
        const { data: user } = await axiosResponse.get("dj-rest-auth/user/");
        setUser(user);
      } catch (error) {
        console.log('Error fetching user:', error);
      }

      try {
        const { data: profiles } = await axiosResponse.get("profiles/");
        setProfiles(prevProfiles => ({
          ...prevProfiles,
          profiles, 
        }))
      } catch (error) {
        console.log('Error fetching profiles:', error);
      }
    })();
  }, []);

  const context = {
    user,
    setUser,
    profiles,
    posts,
    setPosts,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };

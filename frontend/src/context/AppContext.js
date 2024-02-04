import { createContext, useEffect, useState } from "react";
import { axiosResponse } from "../api/axiosDefaults";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState({ results: [] });
  const [profiles, setProfiles] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  useEffect(() => {
    (async () => {
      try {
        const [{ data: user }, {data: profiles }] = await Promise.all([
          axiosResponse.get("dj-rest-auth/user/"),
          axiosResponse.get('/profiles/')
        ])
        setUser(user);
        setProfiles((prevProfiles) => ({
          ...prevProfiles,
          popularProfiles: profiles
        }))
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const context = {
    user,
    setUser,
    profiles,
    posts, 
    setPosts
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
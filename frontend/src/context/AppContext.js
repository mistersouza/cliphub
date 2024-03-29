import { createContext, useEffect, useState } from "react";
import { axiosRequest, axiosResponse } from "../api/axiosDefaults";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState(''); 
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState({ results: [] });
  const [profiles, setProfiles] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] }
  });

  useEffect(() => {
    (async () => {
      try {
        const { data: user } = await axiosResponse.get("dj-rest-auth/user/");
        setUser(user);
      } catch (error) {
        console.log("Error fetching user:", error);
      }

      try {
        const { data: profiles } = await axiosRequest.get("profiles/");
        setProfiles((prevProfiles) => ({
          ...prevProfiles,
          popularProfiles: profiles
        }));
      } catch (error) {
        console.log("Error fetching profiles:", error);
      }
    })();
  }, []);

  const context = {
    user,
    setUser,
    profiles,
    setProfiles,
    posts,
    setPosts,
    query,
    setQuery
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };

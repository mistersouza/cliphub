import { createContext, useEffect, useState } from "react";
import { axiosResponse } from "../api/axiosDefaults";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosResponse.get("dj-rest-auth/user/");
        setUser(data)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const context = {
    user,
    setUser,
    profiles,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
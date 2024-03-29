import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Posts/Feed";
import ClipUpload from "./components/Posts/ClipUpload";
import ClipDetail from "./components/Posts/ClipDetail";
import UserProfile from "./components/profiles/UserProfile";

import { useContext } from "react";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { user } = useContext(AppContext);
  const profileId = user?.profile_id || "";

  return (
    <Router>
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-6 md:gap-20 py-3">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto max-w-sm">
            <Sidebar />
          </div>
          <div className="flex flex-col flex-1 gap-10 overflow-auto h-[88vh] videos">
            <Routes>
              <Route
                path="/"
                element={
                  <Feed
                    filter={`owner__followed__owner__profile=${profileId}&`}
                  />
                }
              />
              <Route path="/posts/:id" element={<ClipDetail />} />
              <Route path="/upload" element={<ClipUpload />} />
              <Route path="/profiles/:id" element={<UserProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

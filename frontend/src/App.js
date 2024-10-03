// React imports
import { useContext, lazy, Suspense } from 'react';
// Dependencies imports
import { Route, Routes } from 'react-router-dom';
// Components imports
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AsyncLoader from './components/AsyncLoader';
// Helpers imports
import { AppContext } from './context/AppContext';
// Lazy load components
const Feed = lazy(() => import('./components/clips/Feed'));
const ClipUpload = lazy(() => import('./components/clips/ClipUpload'));
const ClipDetail = lazy(() => import('./components/clips/ClipDetail'));
const UserProfile = lazy(() => import('./components/profiles/UserProfile'));

const App = () => {
  const { user } = useContext(AppContext);
  const profileId = user?.profile_id || '';

  return (
    <div className="xl:w-[1200px] m-auto overflow-hidden min-h-full">
      <Navbar />
      <div className="flex gap-6 md:gap-20 -mt-0.5">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto max-w-sm">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 gap-10 overflow-auto h-[88vh] videos">
          <Suspense fallback={<AsyncLoader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Feed
                    filter={`owner__followed__owner__profile=${profileId}&`}
                  />
                }
              />
              <Route path="/clips/:id" element={<ClipDetail />} />
              <Route path="/upload" element={<ClipUpload />} />
              <Route path="/profiles/:id" element={<UserProfile />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;

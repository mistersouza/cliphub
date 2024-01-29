import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Posts/Feed";

const App = () => {
  return (
    <Router>
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="flex flex-col flex-1 gap-10 overflow-auto h-[88vh] videos mt-4"></div>
          <Feed />
        </div>
      </div>
    </Router>
  );
};

export default App;

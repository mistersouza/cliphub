import React from "react";
import { Link, useLocation } from "react-router-dom";
import { topics } from "../utils/constants";

const Discover = () => {
  const { search } = useLocation();

  const styles = {
    topic: {
      base: "flex items-center gap-2 justify-center cursor-pointer text-gray-800 px-3 py-2 rounded hover:bg-gray-200 xl:border-2 xl-border-gray-200 xl:rounded-full",
      active:
        "flex items-center gap-2 justify-center cursor-pointer bg-gray-800 text-gray-200 px-3 py-2 rounded hover:bg-gray-800 xl:border-2 xl-border-none xl:rounded-full",
    },
  };

  return (
    <div className="xl:border-b-2 xl:border-gray-200 py-3">
      <p className="hidden xl:block text-gray-800 font-semibold pb-3.5">
        Popular topics
      </p>
      <div className="flex flex-wrap gap-3 px-1.5">
        {topics?.map((topic) => (
          <Link to={`/?topic=${topic.name}`} key={topic.name}>
            <div
              className={
                search.includes(`?topic=${topic.name}`)
                  ? styles.topic.active
                  : styles.topic.base
              }
            >
              <span className="font-bold text-2xl xl:text-md">
                {topic.icon}
              </span>
              <span className="hidden xl:block text-md font-medium">
                {topic.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;

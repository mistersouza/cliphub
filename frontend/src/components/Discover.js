import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { topics } from '../utils/constants';

const Discover = () => {
  const { search } = useLocation();

  // Topic styles
  const { base, active } = {
    base: `
        flex items-center gap-2 justify-center cursor-pointer 
        text-gray-800 px-3 py-2 rounded hover:bg-gray-200 
        xl:border-2 xl-border-gray-200 xl:rounded-full
      `,
    active: `
        flex items-center gap-2 justify-center cursor-pointer 
        bg-gray-800 text-gray-200 px-3 py-2 rounded hover:bg-gray-800 
        xl:border-2 xl-border-none xl:rounded-full
      `,
  };

  return (
    <div
      className="xl:border-b-2 xl:border-gray-200 py-3"
      aria-label="Everyone's favourite topics"
    >
      <h2 className="hidden xl:block text-gray-800 font-semibold pb-3.5">
        Popular topics
      </h2>
      <div className="flex flex-wrap gap-3 px-1.5">
        {topics?.map((topic) => (
          <Link
            to={`/?topic=${topic.name}`}
            key={topic.name}
            aria-label={`Explore ${topic.name} topic`}
          >
            <div
              className={
                search.includes(`?topic=${topic.name}`) ? active : base
              }
            >
              <span
                className="font-bold text-2xl xl:text-md"
                aria-hidden="true"
              >
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

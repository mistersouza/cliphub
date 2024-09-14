import React from 'react';
import { Link } from 'react-router-dom';

const Avatar = ({ id, src, size = 10 }) => {
  const avatar = (
    <div
      className={`
        size-${size} bg-no-repeat bg-center bg-cover rounded-full 
        cursor-pointer
      `}
      style={{ backgroundImage: `url(${src})` }}
    ></div>
  ); 

  // Render Link if there's an id, else button
  return id ? (
    <Link to={`profiles/${id}`}>
      {avatar}
    </Link>
  ) : (
    <button>
      {avatar}
    </button>
  );
};

export default Avatar;

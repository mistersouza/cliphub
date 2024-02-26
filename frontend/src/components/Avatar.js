import React from "react";
import { Link } from "react-router-dom";

const Avatar = ({ id, src, size = 10 }) => {
  return (
    <Link to={`profiles/${id}`}>
      <div
        className={`size-${size} bg-no-repeat bg-center bg-cover rounded-full cursor-pointer`}
        style={{ backgroundImage: `url(${src})` }}
      ></div>
    </Link>
  );
};

export default Avatar;

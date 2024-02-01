import React from 'react';

const Avatar = ({ src, size = 10 }) => {
  return (
    <div
      className={`size-${size} bg-no-repeat bg-center bg-cover rounded-full cursor-pointer`}
      style={{backgroundImage: `url(${src})`}}
    >
    </div>
  );
};

export default Avatar;
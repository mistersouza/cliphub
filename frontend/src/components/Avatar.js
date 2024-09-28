import { Link } from 'react-router-dom';

const Avatar = ({ id, src }) => {
  const avatar = (
    <div
      className={`
        size-10 bg-no-repeat bg-center bg-cover rounded-full 
        cursor-pointer
      `}
      style={{ backgroundImage: `url(${src})` }}
      aria-hidden="true"
    ></div>
  );

  // Render Link if there's an id, else button
  return id ? (
    <Link to={`/profiles/${id}`} aria-label={`View user profile`}>
      {avatar}
    </Link>
  ) : (
    <button aria-label="User avatar">{avatar}</button>
  );
};

export default Avatar;

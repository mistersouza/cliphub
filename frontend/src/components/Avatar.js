// Dependacies imports
import { Link } from 'react-router-dom';

const Avatar = ({ id, src }) => {
  const avatar = (
    <div
      className={`
        size-10 bg-no-repeat bg-center bg-cover rounded-full 
        cursor-pointer
      `}
      style={{ backgroundImage: `url(${src})` }}
    ></div>
  );

  // Render Link if there's an id, else button
  return id ? (
    <Link to={`/profiles/${id}`}>{avatar}</Link>
  ) : (
    <button>{avatar}</button>
  );
};

export default Avatar;

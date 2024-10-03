import { memo } from 'react';
// Dependacies imoprts
import { Link } from 'react-router-dom';

const Avatar = memo(({ id, src }) => {
  const avatar = (
    <div
      className={`
        size-10 bg-no-repeat bg-center bg-cover rounded-full 
        cursor-pointer
      `}
      style={{ backgroundImage: `url(${src})` }}
      aria-hidden="true"
      loading="lazy"
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
});
// Ensures the component has a clear name in React DevTools and satisfy ESLint's react/display-name rule.
Avatar.displayName = 'Avatar';
export default Avatar;

// React imports
import { useContext, useState } from 'react';
// Dependencies imports
import axios from 'axios';
// Helpers imports
import { AppContext } from '../../context/AppContext';
import { setTokenTimestamp } from '../../utils/helpers';

const LogInForm = ({ handleModalClick }) => {
  const { setUser } = useContext(AppContext);
  const [logInData, setLogInData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  // Destructure `logInData` object
  const { username, password } = logInData;

  const handleInputChange = ({ target }) => {
    setLogInData({
      ...logInData,
      [target.name]: target.value,
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('dj-rest-auth/login/', logInData);
      console.log('Login data', data);
      setTokenTimestamp(data);
      setUser(data.user);
      handleModalClick();
    } catch (error) {
      setErrors(error?.response.data);
    }
  };

  return (
    <div className="hidden py-3 xl:block">
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            className={`mt-1 p-2 w-full border rounded-md ${
              errors?.username ? 'border-red-500' : ''
            }`}
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleInputChange}
            // required
          />
          {errors?.username?.map((message, index) => (
            <p className="text-red-500 text-sm mt-1" key={index}>
              {message}
            </p>
          ))}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors?.password ? 'border-red-500' : ''
            }`}
            placeholder="Enter your password"
            onChange={handleInputChange}
            // required
          />
          <div className="text-red-500 text-xs h-3 py-1 px-2">
            {errors?.password?.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
            {errors.non_field_errors && (
              <p>Oops! Creds are no good. Try again</p>
            )}
          </div>
        </div>
        <div>
          <button
            className="w-full text-center text-lg text-gray-800 font-semibold py-2
              border border-gray-800 rounded hover:bg-gray-800 hover:text-gray-50"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;

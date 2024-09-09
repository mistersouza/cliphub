import { useState } from 'react';
import axios from 'axios';

const SignUpForm = ({ handleModalClick }) => {
  const [errors, setErrors] = useState({});
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  const { username, password1, password2 } = signUpData;

  const handleInputChange = ({ target }) => {
    setSignUpData({
      ...signUpData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/dj-rest-auth/registration/', signUpData);
      handleModalClick();
    } catch (error) {
      setErrors(error.response?.data);
      // console.log({ errors });
    }
  };

  return (
    <div className="hidden py-3 xl:block">
      <form onSubmit={handleFormSubmit}>
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
            htmlFor="password1"
            className="text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={password1}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors?.password1 ? 'border-red-500' : ''
            }`}
            placeholder="Enter your password"
            onChange={handleInputChange}
            // required
          />
          {errors?.password1 && (
            <p className="text-red-500 text-sm mt-1">{errors.password1[0]}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password2"
            className="text-sm font-medium text-gray-600"
          >
            Confirm your password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors?.password2 ? 'border-red-500' : ''
            }`}
            placeholder="Enter your password again"
            onChange={handleInputChange}
            // required
          />
          {errors?.password2 && (
            <p className="text-red-500 text-sm mt-1">{errors.password2[0]}</p>
          )}
        </div>
        <div>
          <button
            className="w-full text-center text-lg text-gray-800 font-semibold py-2
            border border-gray-800 rounded hover:bg-gray-800 hover:text-gray-50"          
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;

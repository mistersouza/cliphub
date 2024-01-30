import { useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import axios from "axios";

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
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
      await axios.post("/dj-rest-auth/registration/", signUpData);
    } catch (error) {
      // console.log(error);
      setErrors(error.response?.data);
    }
  };
  
  return (
    <div className="hidden p-4 xl:block">
      <p className="text-gray-800 mb-4">
        Sign up to like and comment on your favorite videos
      </p>
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
              errors?.username ? "border-red-500" : ""
            }`}
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleInputChange}
            required
          />
          {errors?.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username[0]}</p>
          )}
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
            id="password1"
            name="password1"
            value={password1}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors?.password1 ? "border-red-500" : ""
            }`}
            placeholder="Enter your password"
            required
            onChange={handleInputChange}
          />
          {errors?.password1 && (
            <p className="text-red-500 text-sm mt-1">{errors.password1[0]}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
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
              errors?.password2 ? "border-red-500" : ""
            }`}
            placeholder="Enter your password again"
            required
            onChange={handleInputChange}
          />
          {errors?.password2 && (
            <p className="text-red-500 text-sm mt-1">{errors.password2[0]}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 border border-gray-800 rounded-md font-semibold hover:bg-gray-800 hover:text-gray-200"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
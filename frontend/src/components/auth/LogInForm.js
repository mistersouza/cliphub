import { useContext, useState } from "react";
import axios from "axios";

import { AppContext } from "../../context/AppContext";

const LogInForm = () => {
  const { setUser } = useContext(AppContext);
  const [logInData,  setLogInData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
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
      const { data } = await axios.post("/dj-rest-auth/login/", logInData);
      console.log(data);
    } catch (error) {
      console.log(error)
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
            id="password"
            name="password"
            value={password}
            className={`mt-1 p-2 w-full border rounded-md ${
              errors?.password1 ? "border-red-500" : ""
            }`}
            placeholder="Enter your password"
            required
            onChange={handleInputChange}
          />
          {errors?.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full text-center text-lg text-gray-800 font-semibold py-2 border border-gray-800 rounded hover:bg-gray-800 hover:text-gray-50"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
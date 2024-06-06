import { useDispatch, useSelector } from "react-redux";
import * as LoginActions from "../redux/login/actions";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../redux/login/reducer";

type Inputs = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s: { user: User }) => s.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(LoginActions.login(data.username, data.password));
  };

  useEffect(() => {
    if (user.token) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            {...register("username", { required: true })}
            className={`shadow appearance-none border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="Username"
          />
          {errors.username && <p className="text-red-500 text-xs italic">Please enter your username.</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            className={`shadow appearance-none border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="********"
          />
          {errors.password && <p className="text-red-500 text-xs italic">Please enter your password.</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

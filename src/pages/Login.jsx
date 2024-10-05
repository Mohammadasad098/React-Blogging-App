import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { loginUser } from '../config/firebase/firebasemethods';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUserFromFirebase = async (data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const userLogin = await loginUser({
        email: data.email,
        password: data.password
      });
      // console.log(userLogin);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(loginUserFromFirebase)} className="bg-white shadow-lg rounded-lg px-8 py-10 w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-center text-4xl font-bold text-gray-800">LOGIN</h1>
        </div>
        <div className="border rounded-3xl px-6 py-8 bg-[#ffeef2]">
          <label className="block mb-4">
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="Email"
              className="input input-bordered w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.email && <span className='text-red-600'>This field is required</span>}
          </label>
          <label className="block mb-4">
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="Password"
              className="input input-bordered w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.password && <span className='text-red-600'>This field is required</span>}
          </label>
          {errorMessage && <span className='text-red-600 text-center block mb-4'>{errorMessage}</span>}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-[#00b5fd] text-white rounded-lg"
              disabled={loading} // Disable button while loading
            >
              {loading ? <span className="loading loading-dots loading-md"></span> : 'LOGIN'} {/* Keep 'LOGIN' until loading */}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

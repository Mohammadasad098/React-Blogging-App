import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUpUser, uploadImage } from '../config/firebase/firebasemethods';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUserFromFirebase = async (data) => {
    // console.log(data);
    setLoading(true);

    if (data.profileimage.length > 0) {
      const userProfileImageUrl = await uploadImage(data.profileimage[0], data.email);

      try {
        const userData = await signUpUser({
          fullname: data.fullname,
          email: data.email,
          password: data.password,
          profileImage: userProfileImageUrl,
        });
        // console.log('User Registered Successfully:', userData);
        navigate('/login');
      } catch (error) {
        // console.error('Error registering user:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Profile image is required');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(registerUserFromFirebase)} className="bg-white shadow-lg rounded-lg px-8 py-10 w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-center text-4xl font-bold text-gray-800">REGISTER</h1>
        </div>
        <div className="border rounded-3xl px-6 py-8 bg-[#ffeef2]">
          <label className="block mb-4">
            <input
              {...register("fullname", { required: "Full Name is required" })}
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full px-4 py-2 rounded-lg placeholder:text-[#208b3a] border border-gray-300 focus:outline-none focus:border-[#208b3a]"
            />
            {errors.fullname && <span className='text-red-600'>{errors.fullname.message}</span>}
          </label>
          <label className="block mb-4">
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
          </label>
          <label className="block mb-4">
            <input
              {...register("password", { 
                required: "Password is required", 
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
          </label>

          <label className="block mb-5">
            <input
              {...register("profileimage", { required: "Profile image is required" })}
              type="file"
              className="file-input file-input-bordered file-input-info w-full max-w-xs"
            />
            {errors.profileimage && <span className='text-red-600'>{errors.profileimage.message}</span>}
          </label>
          <div className="text-center">
            <button
              type="submit"
              className={`w-full py-3 rounded-lg ${loading ? 'bg-gray-400' : 'bg-[#00b5fd]'} text-white`}
              disabled={loading} 
            >
              {loading ? <span className="loading loading-dots loading-md"></span> : 'REGISTER'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

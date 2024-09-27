import React from 'react';
import { useForm } from 'react-hook-form';
import { signUpUser, uploadImage } from '../config/firebase/firebasemethods';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUserFromFirebase = async (data) => {
    console.log(data);


    if (data.profileimage.length > 0) {
      const userProfileImageUrl = await uploadImage(data.profileimage[0], data.email);

      try {
        const userData = await signUpUser({
          fullname: data.fullname,
          email: data.email,
          password: data.password,
          profileImage: userProfileImageUrl,
        });
        console.log('User Registered Successfully:', userData);
        navigate('/login')
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      console.error('Profile image is required');
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
              {...register("fullname", { required: true })}
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full px-4 py-2 rounded-lg placeholder:text-[#208b3a] border border-gray-300 focus:outline-none focus:border-[#208b3a]"
            />
            {errors.fullname && <span className='text-red-600'>This field is required</span>}
          </label>
          <label className="block mb-4">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.email && <span className='text-red-600'>This field is required</span>}
          </label>
          <label className="block mb-4">
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.password && <span className='text-red-600'>This field is required</span>}
          </label>

          <label className="block mb-5">
            <input
              {...register("profileimage", { required: true })}
              type="file"
              className="file-input file-input-bordered file-input-info w-full max-w-xs"
            />
            {errors.profileimage && <span className='text-red-600'>This field is required</span>}
          </label>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-[#00b5fd] text-white rounded-lg"
            >
              REGISTER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

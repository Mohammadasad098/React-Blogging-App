import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { auth, deleteDocument, getData , sendData } from '../config/firebase/firebasemethods';
import { onAuthStateChanged } from 'firebase/auth';


const Dashboard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid);
        const blogsData = await getData('blogs', user.uid);
        console.log(blogsData);
        setBlogs([...blogsData]);
      }
    });
  }, []);

  const sendDatatoFirestore = async (data) => {
    console.log(data);
    try {
      const response = await sendData(
        {
          title: data.title,
          description: data.description,
          uid: auth.currentUser.uid,
        },
        'blogs'
      );
      blogs.push({
        title: data.title,
        description: data.description,
        uid: auth.currentUser.uid,
      });
      setBlogs([...blogs]);
      console.log(response);
      reset();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className="my-6 p-6 border-4 border-gray-300 rounded-lg">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white text-center">
          Dashboard
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(sendDatatoFirestore)}
        className="w-full max-w-lg mx-auto p-6 border-4 border-gray-300 rounded-lg shadow-lg"
      >
        <input
          {...register('title', { required: true })}
          type="text"
          placeholder="Title"
          className="input input-bordered w-full border-2 p-2 mb-4"
        />
        {errors.title && (
          <span className="text-red-600">This field is required</span>
        )}

        <textarea
          {...register('description', { required: true })}
          rows="4"
          className="textarea textarea-bordered w-full border-2 p-2"
          placeholder="Description"
        ></textarea>
        {errors.description && (
          <span className="text-red-600">This field is required</span>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-[#00b5fd] text-white rounded-lg"
        >
          Publish blog
        </button>
      </form>
      {blogs.length > 0 ? (
        blogs.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 my-4 mx-auto max-w-3xl border border-gray-200"
            >
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {item.title}
              </h1>
              <p className="text-gray-600">{item.description}</p>
            </div>
          );
        })
      ) : (
        <h1 className='text-center m-10 text-4xl'>no blogs found</h1>
      )}
    </>
  );
};

export default Dashboard;

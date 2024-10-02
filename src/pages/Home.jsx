import React, { useEffect, useState } from 'react';
import { auth, db, getAllData } from '../config/firebase/firebasemethods';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(usersData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const fetchBlogs = async () => {
    try {
      const blogsData = await getAllData("blogs");
      console.log(blogsData);
      setBlogs(blogsData);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setErrorBlogs('Failed to load blogs. Please try again later.');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBlogs();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user.uid);
      } else {
        console.log("User is logged out.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
     <div className="my-6 p-6 border-4 border-gray-300 rounded-lg">
  <h1 className="text-5xl font-bold text-gray-800 dark:text-white text-center">
    All Blogs
  </h1>
</div>
  {blogs.length > 0 ? (
    blogs.map((item) => {
      const user = users.find((user) => user.id === item.uid);

      return (
        <div
          key={item.id}
          className="bg-white shadow-lg rounded-xl p-6 my-12 mx-auto max-w-4xl border border-gray-300 flex items-start"
        >
          {user && user.profileImage && (
            <img 
              src={user.profileImage} 
              alt="User" 
              className="w-20 h-20 rounded-full mr-4" 
            />
          )}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">{item.title}</h2>
            <p className="text-lg text-gray-600">{item.description}</p>
            <p className="text-lg text-center text-gray-400 mt-2">
              Posted by: {user ? user.fullname : 'Unknown'}
            </p>
          </div>
        </div>
      );
    })
  ) : (
    <div className="flex justify-center items-center h-64"> 
      <span className="loading loading-spinner loading-lg text-info"></span>
    </div>
  )}
    </>
  );
};

export default Home;

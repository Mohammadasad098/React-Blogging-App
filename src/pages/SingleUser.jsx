import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../config/firebase/firebasemethods';
import { collection, getDocs, query, where } from 'firebase/firestore';

const SingleUser = () => {
  const { uid } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, 'blogs'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        const userBlogs = querySnapshot.docs.map((doc) => doc.data());
        // console.log(userBlogs);
        setBlogs(userBlogs);
      } catch (err) {
        // console.error('Error fetching blogs:', err);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, [uid]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, 'users'), where('id', '==', uid)); 
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      } catch (error) {
        // console.error('Error fetching user data:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [uid]);

  if (loadingBlogs || loadingUser) {
    return <div className='flex justify-center m-11'><span className="loading loading-spinner loading-lg"></span></div>;
  }
  const lessThan = '<';
  return (
    <>
      <div className="border border-gray-300 p-4 mb-4">
        <Link to={'/'}><p className='text-4xl mx-32 text-[#00b5fd] font-semibold'>{lessThan}Back to all blogs</p></Link>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-8 p-4">
        <div className="w-full md:w-2/3">
          <h3 className="text-3xl font-bold mt-4 mb-6 text-center md:text-left mx-32">
            {userData ? `All Blogs from ${userData.fullname}` : "All Blogs"}
          </h3>
          {blogs.length > 0 ? (
            blogs.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 my-4 mx-auto w-full sm:max-w-2xl md:max-w-3xl border border-gray-200"
              >
                {userData && (
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={userData.profileImage}
                      alt={userData.fullname}
                      className="w-16 h-16 rounded-full"
                    />
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      {item.title}
                    </h1>
                  </div>
                )}
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))
          ) : (
            <h1 className="text-center m-10 text-2xl md:text-4xl">No blogs found</h1>
          )}
        </div>

        {userData && (
          <div className="w-full md:w-1/3">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm font-medium underline mb-1">{userData.email}</p>
                <h3 className="text-lg font-semibold">{userData.fullname}</h3>
              </div>
              <img
                src={userData.profileImage}
                alt={userData.fullname}
                className="w-40 h-32 md:w-72 md:h-52 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleUser;

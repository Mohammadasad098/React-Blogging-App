import React from 'react'
import { auth, signOutUser } from '../config/firebase/firebasemethods';

const Logout = () => {


   const userLogout = () => {
    signOutUser(auth)
    .then((message) => {
      // console.log(message);
      // console.log('successfully Logout');
    })
    .catch((error) => {
      // console.error("Sign out failed: ", error);
    });
   }
      
  return (
    <>
    <div className="my-6 p-6 border-4 border-gray-300 rounded-lg">
  <h1 className="text-5xl font-bold text-gray-800 dark:text-white text-center">
    Logout
  </h1>
</div>
<button onClick={userLogout} type="submit"className="w-full py-3 bg-[#00b5fd] text-white rounded-lg">Logout</button>
    </>
  )
}

export default Logout
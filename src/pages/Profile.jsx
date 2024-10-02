import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth, db } from '../config/firebase/firebasemethods';
import { collection, query, where, getDocs } from "firebase/firestore";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [singalUserData, setSingalUserData] = useState({}); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(collection(db, "users"), where("id", "==", user.uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log(userData);
            setSingalUserData(userData);
          });
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      } else {
        console.log('User is logged out');
      }
    });

    return () => unsubscribe();
  }, []);

  const onSubmit = async (data) => {
    const user = auth.currentUser;

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(user.email, data.oldPassword);
        await reauthenticateWithCredential(user, credential);


        if (data.newPassword === data.repeatPassword) {

          await updatePassword(user, data.newPassword);
          console.log('Password updated successfully!');
          reset();
        } else {
          console.log('New passwords do not match.');
        }
      } catch (error) {
        console.error('Error updating password:', error);
      }
    } else {
      console.log('No user is logged in.');
    }
  };


  const newPassword = watch('newPassword');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">

        
       <form onSubmit={handleSubmit(onSubmit)}>
          {/* Old Password*/}
          {singalUserData.profileImage && (
          <div className="mb-4">
            <img 
              src={singalUserData.profileImage} 
              alt="User"
              className="w-36 h-36 border-2 rounded-lg border-gray-300" 
            />
            <h1>{singalUserData.fullname} </h1>
          </div>
        )} 
          <div className="form-control mb-4">
          <h1 className='font-bold text-2xl my-2'>Password</h1>

            <input
              type="password"
              {...register('oldPassword', { required: 'Old password is required' })}
              placeholder="Enter old password"
              className="input input-bordered w-full"
            />
            {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
          </div>

          {/* New Password Field */}
          <div className="form-control mb-4">
            <input
              type="password"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              placeholder="Enter new password"
              className="input input-bordered w-full"
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
          </div>

          {/* Repeat New Password Field */}
          <div className="form-control mb-6">
            <input
              type="password"
              {...register('repeatPassword', {
                required: 'Please repeat the new password',
                validate: (value) =>
                  value === newPassword || 'Passwords do not match',
              })}
              placeholder="Repeat new password"
              className="input input-bordered w-full"
            />
            {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword.message}</p>}
          </div>

          <button className="btn bg-[#00b5fd] w-full" type="submit">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

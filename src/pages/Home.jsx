import React, { useEffect , useState } from 'react'
import { auth, getData } from '../config/firebase/firebasemethods';
import { onAuthStateChanged } from 'firebase/auth';
const Home = () => {
  const [blogs , setBlogs] = useState([])
  useEffect(() => {

    onAuthStateChanged(auth , async(user)=>{
      if(user){
        console.log(user.uid)
        const blogsData = await getData("blogs" , user.uid)
        console.log(blogsData)
        setBlogs([...blogsData])
      }
    })
  }, [])
  
  return (
    <>
    <div className="my-6 p-6 border-4 border-gray-300 rounded-lg">
  <h1 className="text-5xl font-bold text-gray-800 dark:text-white text-center">
    All Blogs
  </h1>
</div>
    {blogs.length > 0 ? blogs.map((item , index) => {
  return <div 
  key={index} 
  className="bg-white shadow-lg rounded-xl p-16 my-12 mx-auto max-w-4xl border border-gray-300"
>
  <h1 className="text-4xl font-bold text-gray-800 mb-6">{item.title}</h1>
  <p className="text-lg text-gray-600">{item.description}</p>
</div>

}) : <span className="loading m-8 loading-spinner loading-lg text-info"></span>}
    </>
  )
}

export default Home
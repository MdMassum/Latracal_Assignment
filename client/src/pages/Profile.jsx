import React, { useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOutFailure, signOutStart, signOutSuccess, updateProfileFailure, updateProfileStart, updateProfileSuccess } from '../redux/user/userSlice';
import {Link, useNavigate} from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Profile() {

  // useStates
  const [formData, setFormData] = useState({})
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {currentUser, loading, error} = useSelector((state)=>state.user);
  console.log(currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // for input change -->
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  // signOut -->
  const handleSignOut=async()=>{
    try {
      dispatch(signOutStart())
      const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,{
        method: "POST",
        headers:{"Content-Type": "application/json"},
      })
      if(resp.success === false){
        dispatch(signOutFailure(resp.message))
        return;
      }

      dispatch(signOutSuccess());
      navigate('/')

    } catch (error) {
      dispatch(signOutFailure(error.message))
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateProfileStart());

      const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/update/${currentUser._id}`,{
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        credentials:'include', 
        body: JSON.stringify(formData)
      });
      const data = await resp.json();

      if(data.success === false){
        setUpdateSuccess(false);
        dispatch(updateProfileFailure(data.message))
        return;
      }
      setUpdateSuccess(true);
      dispatch(updateProfileSuccess(data));

    } catch (err) {
      setUpdateSuccess(false);
      dispatch(updateProfileFailure(err.message));
    }
  }


  const handleToggle=()=>{
    setShowPassword(!showPassword)
  }
  
  return (
    <div className="w-screen">
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-5xl text-center font-semibold my-2 mt-16 mb-8'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

          
          <input onChange={handleChange} defaultValue={currentUser.name} type="text"  placeholder='Name' id='name' className='border rounded-lg p-3'/>

          <input onChange={handleChange} defaultValue={currentUser.email} type="text" disabled  placeholder='email' id='email' className='border rounded-lg p-3'/>

          <div className="flex gap-1 items-center border rounded-lg p-2">
              <input onChange={handleChange} defaultValue={""} type={showPassword ? "text":"password"} placeholder='update password' className="outline-none flex-1 p-2 rounded-lg" id='password'/>
              <div className='cursor-pointer p-2' onClick={handleToggle}>
                {showPassword ?
                 <FaEyeSlash className="text-gray-700 dark:text-gray-300 bg-transparent w-6 h-6"/> 
                 :<FaEye className="text-gray-700 dark:text-gray-300 bg-transparent w-6 h-6" />
                 }
              </div>
          </div>

          <button disabled={loading} className='uppercase bg-slate-700 text-white rounded-lg p-3 
          hover:opacity-90 disabled:opacity-90 '>{loading ? "Updating..." : "Update"}</button>
          
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer text-lg text-center'>Sign Out</span>
      </div>
        {error ? <p className='text-red-700 mt-5 text-sm'>{error}</p> 
        : ""}
        {updateSuccess ? <p className='text-green-700 mt-5 text-sm'>User is Updated Successfully</p> 
        : ""}
        
    </div>
    </div>
  )
}

export default Profile
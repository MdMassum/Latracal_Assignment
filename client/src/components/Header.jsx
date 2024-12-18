import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Header() {

    const {currentUser} = useSelector((state)=>state.user);
    const [searchKey, setSearchKey] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);  // it gets the url from person window
        urlParams.set('searchKey',searchKey);       // setting our searching keyword in url
        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);
    }

    useEffect(()=>{      // if already searched from url we get search term in our search bar

        const urlParams = new URLSearchParams(window.location.search);
        const searchKeyFromUrl = urlParams.get('searchKey');
        
        if(searchKeyFromUrl){
            setSearchKey(searchKeyFromUrl)
        }
    },[location.search])
  return (
    <header className='bg-slate-200 shadow-md w-screen absolute top-0 z-10'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <NavLink to='/home' className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Latracal</span>
            <span className='text-slate-700'>Assignment</span>
            </NavLink>
            <form onSubmit={handleSubmit} className="bg-slate-100 text-slate-700 p-3 rounded-lg flex items-center ">
                <input type="text" placeholder='Search...' 
                    className='bg-transparent focus:outline-none w-24 sm:w-64'
                    value={searchKey}
                    onChange={(e)=>setSearchKey(e.target.value)}
                />
                <button className='p-0 outline-none border-none'>
                    <FaSearch className='bg-white text-xl cursor-pointer' />
                </button>
                
            </form>
            <ul className='flex gap-4 '>
                {
                    currentUser.role === 'admin' && <NavLink to={'/create-book'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Create Book</li>
                    </NavLink>
                }
                <NavLink to={'/home'}>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </NavLink>
                <NavLink to={'/profile'}>
                {
                    currentUser.avatar ? (<img src={currentUser.avatar} alt='Profile' className='w-7 h-7 rounded-full object-cover' />) : 
                    (<li className='text-slate-700 hover:underlinetext-sm sm:text'>Profile  </li>)
                }
                </NavLink>
            </ul>
        </div>


    </header>
  )
}

export default Header
import React from 'react'
import { Link } from 'react-router-dom'
import coverImage from '../assets/bookcover.webp'
import { FaStar } from "react-icons/fa";

function BookItem({Book}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[345px] sm:w-[349px] m-3'>
        <Link to={`/book/${Book._id}`}>
            
            <img src={Book.coverImage || coverImage} alt="Cover Page" 
            className='h-[230px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>

            <div className="p-3 flex flex-col">
                <p className='font-semibold text-slate-700 text-lg truncate mb-2 '>Title : {Book.title}</p>
                <div className="flex gap-1 items-center">
                    <p className='text-gray-600 text-sm truncate'>Author : {Book.author}</p>
                </div>
                <div className="">
                    <p className='text-gray-600 text-sm line-clamp-2 py-1'>Summary : {Book.summary}</p>
                    <p className='text-gray-600 text-sm line-clamp-2 py-1 flex items-center gap-1'>Rating : {Book.ratings}<FaStar/></p>
                </div>
            </div>
            
        </Link>
    </div>
  )
}

export default BookItem
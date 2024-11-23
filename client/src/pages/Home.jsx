import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookItem from '../components/BookItem';

function Home() {

  const [books, setBook] = useState([]);

  // fetching  Books
  // console.log(books)
  const fetchBook=async()=>{
    try {
       
      const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/book/allBooks?limit=3`,{
        method: "GET",
        credentials:'include'
      });
      const data = await resp.json();
      setBook(data);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{

    fetchBook();
  },[])

  return (
    <div>
      {/* top page */}
      
      <h1 className='mt-28 mb-10 text-slate-700 font-bold text-3xl md:text-6xl dark:text-slate-400 text-center'>Feature Books</h1>

      <div className="max-w-6xl mx-auto p-1 flex flex-col gap-6">
        {
          books && books.length>0 && (
              <div className="">
                <div className="my-3 text-center">
                  <h2 className='text-2xl font-semibold text-slate-600 dark:text-slate-400 mx-2'>Top Books</h2>
                  <Link to={'/search?offer=true'} className='mx-2 text-xs sm:text-sm text-blue-800 font-bold hover:underline dark:text-blue-400'>Show More Books..</Link>
                </div>
                <div className="flex gap-1 flex-wrap">
                {
                books && books.length>0 && (
                  books.map((book)=>(
                    <BookItem Book={book} key={book._id} />
                  ))
                )}
                </div>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Home
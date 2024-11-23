import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookItem from '../components/BookItem';

function Search() {

    const [sideBarData, setSideBarData] = useState({
        searchKey:'',
        sort:'created_at',
        order:'desc',
    })
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    const handleChange=(e)=>{
        if(e.target.id === 'searchKey'){
            setSideBarData({
                ...sideBarData,
                [e.target.id]:e.target.value
            })
        }
        if(e.target.id === 'sort_order'){

            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideBarData({
                ...sideBarData,
                sort,
                order
            })
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()

        //first get the url from browser then update that url
        const urlParams = new URLSearchParams();
        urlParams.set('searchKey',sideBarData.searchKey);   // setting query on the url

        const searchQuery = urlParams.toString()
        console.log(searchQuery);
        navigate(`/search/?${searchQuery}`)
    }

    const fetchBooks = async()=>{
        try {
            setLoading(true);
            const urlParams = new URLSearchParams(location.search);
            const searchQuery = urlParams.toString()
            const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/book/allBooks/?${searchQuery}`,{
                method: "GET",
                credentials:'include'
              });
            const data = await resp.json();
            setBooks(data.books);

            if(data.length > 5){
                setShowMore(true);
            }
            else{
                setShowMore(false)
            }
            setBooks(data);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    }
    const fetchMoreBooks = async() =>{
        const len = books.length;
        const startIndex = len;

        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex',startIndex)
        const searchQuery = urlParams.toString()

        const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/book/allBooks/?${searchQuery}`,{
            method: "GET",
            credentials:'include'
          });
        const data = await resp.json();

        if(data.length < 6){
            setShowMore(false);
        }
        setBooks([...books,...data]);
    }
    useEffect(()=>{

        const urlParams = new URLSearchParams(location.search);
            const searchKeyFromUrl = urlParams.get('searchKey');   // getting query from url
            
            if(searchKeyFromUrl){
                setSideBarData({
                    searchKey:searchKeyFromUrl || '',
                })
            }

        fetchBooks() 

    },[location.search])

    console.log(books);
  return (
    <div className="w-screen mt-10">
    <div className='flex flex-col md:flex-row '>
        <div className="p-8 md:border-r-2 md:min-h-screen md:w-[360px]">
            <form onSubmit={handleSubmit}
             className='flex flex-col gap-8 mt-16'>
                <div className="flex flex-col gap-2">
                    <label className='font-semibold text-xl'>Search title of book: </label>
                    <input type="text" id='searchKey' placeholder='Search..' className='border p-3 w-full rounded-lg'
                    value={sideBarData.searchKey} 
                    onChange={handleChange}
                    />
                </div>
                <button className='bg-slate-700 rounded-lg p-3 uppercase text-white hover:opacity-90'>Search</button>
            </form>
        </div>  
        
        <div className="flex-1 p-7">
            <h1 className='text-3xl font-semibold border-b p-3 mb-3 text-slate-700 dark:text-gray-300 '>Book results:</h1>
            <div className="flex flex-wrap sm:gap-10 sm:mx-6 ">
            {!loading && books.length === 0 &&
                <p className='text-xl text-slate-700 m-auto dark:text-gray-400'> No Book Found !!</p>}
            {loading &&
                <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
            }
            {
                !loading && books.length > 0 && books.map((Book)=>(
                    <BookItem Book={Book} key={Book._id}/>
                ))
            }
            {
                showMore && 
                <button
                onClick={fetchMoreBooks}
                className='text-green-700 hover:underline p-3 text-center w-full outline-none bg-white border-none dark:bg-transparent'>
                    Show More
                </button>
            }
            </div>
        </div>
    </div>
    </div>
  )
}

export default Search
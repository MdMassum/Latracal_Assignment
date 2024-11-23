import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";


import coverImage from '../assets/bookcover.webp';
import { FaShare, FaStar } from 'react-icons/fa';

export default function Bookbook() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState({ rating: '', comment: '' });

  const navigate = useNavigate();
  const params = useParams();
  const {currentUser} = useSelector((state)=>state.user)

  const handleReviewSubmit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/review/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookId: params.id,
            rating: review.rating,
            comment: review.comment,
          }),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        setBook((prevBook) => ({
          ...prevBook,
          reviews: [...prevBook.reviews, data.newReview],
        }));
        setReview({ rating: '', comment: '' });
        setIsModalOpen(false);
        fetchbook()
      } else {
        alert("Failed to add review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  const handleDeleteReview = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/review/delete/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        setBook((prevBook) => ({
          ...prevBook,
          reviews: [...prevBook.reviews, data.newReview],
        }));
        setReview({ rating: '', comment: '' });
        setIsModalOpen(false);
        fetchbook()
      } else {
        alert("Failed to add review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const fetchbook = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/book/getbook/${params.id}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setBook(data.book);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    
    fetchbook();
  }, [params.id]);

  return (
    <main className="w-screen">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {book && !loading && !error && (
        <div>
          <img
            src={book.coverImage || coverImage}
            alt=""
            className="w-screen h-96 object-cover"
          />
          <div
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
            className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
          >
            <FaShare className="text-slate-500" />
          </div>
          <div
            className="fixed top-[5%] left-[3%] z-10 rounded-md bg-slate-100 p-2 dark:text-black"
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 dark:text-black">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-2">
            <p className="text-2xl font-semibold">Title : {book.title}</p>
            <p className="flex items-center gap-2 text-sm">Author : {book.author}</p>
            <p className="flex gap-1 items-center">
              Rating : {book.ratings} <FaStar />
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              <span className="font-semibold text-black dark:text-gray-300">
                Summary :
              </span>
              {book.summary}
            </p>

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Add Review
            </button>
            <div>
              <p className='text-lg mt-6 mb-2'>Reviews :</p>
              {book.reviews.length === 0 ? (
                <p>No Review !!</p>
              ) : (
              <div className='flex gap-4'>
              {
                book.reviews && book.reviews.length > 0 && book.reviews.map((review, index) => {
                  return (
                    <div key={index} className='border border-black bg-gray-400 text-white h-28 w-52 rounded-lg p-2 overflow-hidden'>

                      <p className='flex justify-between'>
                        <div><strong>Name:</strong> {review.name || 'unknown'}</div>
                        {
                          review.user === currentUser._id &&
                        <MdDelete onClick={handleDeleteReview} className='cursor-pointer h-7 w-7'/>
                        }
                      </p>
                      <p className='flex justify-between'>
                        <div><strong>Rating:</strong> {review.rating || 0}</div>
                      </p>
                      <p>
                        <strong>Comment:</strong> {review.comment || 'unknown'}
                      </p>
                    </div>
                  );
                })
                }</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black  bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
            <h2 className="text-xl font-semibold mb-4 text-black text-center">Add Review</h2>
            <label className="block mb-2">
              Rating:
              <input
                type="number"
                min="1"
                max="5"
                value={review.rating}
                onChange={(e) =>
                  setReview((prev) => ({ ...prev, rating: e.target.value }))
                }
                className="block w-full bg-gray-200 border border-black rounded px-3 py-2 mt-1"
              />
            </label>
            <label className="block mb-4">
              Comment:
              <textarea
                value={review.comment}
                onChange={(e) =>
                  setReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                className="block w-full bg-gray-200 border border-black px-3 py-2 mt-1"
                rows="3"
              ></textarea>
            </label>
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

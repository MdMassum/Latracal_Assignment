import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        summary: "",
        category: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/book/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await resp.json();
            setLoading(false);

            if (!resp.ok || !data.success) {
                throw new Error(data.message || "Failed to create the book.");
            }

            navigate(`/book/${data.book._id}`);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };
    
    return (
        currentUser.role !== 'admin' ? <h1 className="flex flex-col text-4xl gap-4 m-36 items-center justify-center">Sorry You Are Not Authorized !!!  <p className="text-xl">Only Admin Can Access !!</p></h1> :
        <div className="w-screen">
            <div className="p-3 max-w-xl mx-auto mt-14">
                <h1 className="text-3xl font-semibold text-center my-7">
                    Create a Book
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 flex-1">
                        <input
                            type="text"
                            placeholder="Enter Title"
                            className="border p-3 rounded-lg"
                            id="title"
                            maxLength="62"
                            minLength="10"
                            required
                            value={formData.title}
                            onChange={handleOnChange}
                        />
                        <input
                            type="text"
                            placeholder="Enter Author Name"
                            className="border p-3 rounded-lg"
                            id="author"
                            required
                            value={formData.author}
                            onChange={handleOnChange}
                        />
                        <input
                            type="text"
                            placeholder="Enter Category"
                            className="border p-3 rounded-lg"
                            id="category"
                            required
                            value={formData.category}
                            onChange={handleOnChange}
                        />
                        <textarea
                            type="text"
                            placeholder="Enter Summary"
                            className="border p-3 rounded-lg"
                            id="summary"
                            required
                            value={formData.summary}
                            onChange={handleOnChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`p-3 rounded-lg bg-blue-500 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Create Book"}
                    </button>
                </form>
                {error && <p className="text-red-700 text-sm">{error}</p>}
            </div>
        </div>
        // }
    );
}

export default CreateBook
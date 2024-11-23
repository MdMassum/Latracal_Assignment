# Full Stack App With Book Listing, Comments & User Authentication

## Deployement link : `https://latracal-assignment.vercel.app/`

## Getting Started

1. Clone the repository: `git clone https://github.com/MdMassum/Latracal_Assignment.git`
2. Install the dependencies: `npm install`
3. Start the client: `cd client npm run dev`
3. Start the server: `cd server npm run dev`

## Key Technologies Used

- **Backend**
- **Node.js**: The primary backend framework for building the API.
- **Express.js**: Used to handle HTTP requests and routing.
- **MongoDB**: Used for storing User and Book Data.
- **Helmet**: Adds security headers to the application for enhanced security.

- **Frontend**
- **Reactjs**: Main framework for Frontend
- **React Router**: Handles SPA routing seamlessly.
- **Tailwind CSS**: Utility-first CSS framework for styling.



## APIs Overview

The API supports CRUD operations for **Books**, **comments**, and **user authentication**, with capabilities like creating **Book Only By Admin**, adding comments & rating and authenticating users. The API ensures seamless user experience with features such as:

- **User Authentication**: Register, login, logout and Profile Update.
- **Book Management**: Create (Only by Admin), retrieve all Books with pagination.
- **Comments Management**: Create and delete comments on Books Post.
- **Error Handling**: Structured error responses with appropriate HTTP status codes for common errors like authentication failure and resource not found.

## APIs

-**Auth Routes**
1. POST /api/auth/signIn : Login User.
2. POST /api/auth/signUp : SignUp user.
3. POST /api/auth/logout : Logout user.

-**User Routes**
1. GET /api/user/allUsers : Get all Users.
1. GET /api/user/get/:id : Get User By Id.
1. PUT /api/user/update/:id : Update User by Id.

-**Book Routes**
1. POST /api/book/create : Create Book Only By Admin.
1. GET /api/book/allBooks : Get all books.
1. GET /api/book/getbook/:id : GetBook by Id.

-**Book Routes**
1. GET /api/review/get/:id : Get All reviews of A book by bookId.
1. POST /api/review/add : Create a review (One user can create only one review).
1. DELETE /api/review/getbook/:id : Delete review (user can delete only there review).

## Model

The User model is defined in `models/userModel.js`.
The Book model is defined in `models/bookModel.js`.

## Database
The app connects to a MongoDB database using Mongoose.

## Version Control
This project uses Git for version control.

## Deployement

Deployed the app on vercel
link : `https://latracal-assignment.vercel.app/`


## Frontend

- **Pages**
- '/' -> login page
- '/signUp' -> SignUp page
- '/home' -> home page
- '/profile' -> Profile Page
- '/search'   -> Search Page
- '/book/:id'  -> Book Listing Page

- '/create-book' -> Create Book Page (Only Admin Can Access)
- **All Pages Are Authenticated Except Login & SignUp Page**
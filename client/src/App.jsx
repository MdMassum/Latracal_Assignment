import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import BookListing from './pages/BookListing';
import Search from './pages/Search';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import CreateBook from './pages/CreateBook';

function Layout() {
  const location = useLocation();
  const showFooter = ['/home', '/search/','/search','/create-book'];
  const showHeader = ['/home', '/search/','/search', '/profile','/create-book'];
  
  return (
    <>
      {showHeader.includes(location.pathname) && <Header /> }
      <Routes>
        <Route path='*' element={<NotFoundPage/>} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/' element={<SignIn />} />

        <Route element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/book/:id' element={<BookListing />} />
        <Route path='/search' element={<Search />} />
        <Route path='/create-book' element={<CreateBook />} />
        </Route>
      </Routes>
      {showFooter.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;

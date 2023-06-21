import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // импортируем Routes
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import './App.css';

import moviesApi from '../../utils/MoviesApi';

function App() {
  const [initialMovies, setInitialMovies] = useState([]);
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Виталий', email: 'pochta@yandex.ru' });
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    function handleAutoCloseMenu() {
      window.onresize = () => {
        setIsBurgerMenuOpen(false);
      };
    }

    if (isBurgerMenuOpen) {
      window.addEventListener('resize', handleAutoCloseMenu);
      return () => window.removeEventListener('resize', handleAutoCloseMenu);
    }
  }, [isBurgerMenuOpen]);

  useEffect(() => {
    moviesApi.getMovies().then((movies) => {
      setInitialMovies(movies);
    });
  }, []);

  function handleSignUp() {
    navigate('/signin', { replace: true });
  }

  function handleSignIn() {
    setIsLoggedIn(true);
    navigate('/', { replace: true });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  }

  function handleSaveMovie() {
    setIsMovieSaved(!isMovieSaved);
  }

  function handleOpenBurgerMenu() {
    setIsBurgerMenuOpen(true);
  }

  function handleCloseBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  function handleEditProfile() {
    setIsProfileEdit(true);
  }

  function hadleProfileSubmit() {
    setIsProfileEdit(false);
  }

  return (
    <div className='page'>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className='page__content'>
          <Header
            isLoggedIn={isLoggedIn}
            isBurgerMenuOpen={isBurgerMenuOpen}
            onBurgerMenuOpen={handleOpenBurgerMenu}
            onBurgerMenuClose={handleCloseBurgerMenu}
          ></Header>
          <Routes>
            <Route
              path='/'
              element={<Main isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuOpen={handleOpenBurgerMenu} />}
            ></Route>
            <Route
              path='/movies'
              element={
                <Movies
                  moviesCards={initialMovies.slice(0, 12)}
                  isMovieSaved={isMovieSaved}
                  onSaveMovie={handleSaveMovie}
                  isBurgerMenuOpen={isBurgerMenuOpen}
                  onBurgerMenuOpen={handleOpenBurgerMenu}
                />
              }
            ></Route>
            <Route
              path='/saved-movies'
              element={
                <SavedMovies
                  moviesCards={initialMovies.slice(0, 3)}
                  isBurgerMenuOpen={isBurgerMenuOpen}
                  onBurgerMenuOpen={handleOpenBurgerMenu}
                />
              }
            ></Route>
            <Route
              path='/profile'
              element={
                <Profile
                  user={user}
                  isEdit={isProfileEdit}
                  onSubmit={hadleProfileSubmit}
                  onEditProfile={handleEditProfile}
                  onSignOut={handleSignOut}
                />
              }
            ></Route>
            <Route path='/signin' element={<Login onSubmit={handleSignIn} />}></Route>
            <Route path='/signup' element={<Register onSubmit={handleSignUp} />}></Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;

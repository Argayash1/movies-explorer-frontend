import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import './App.css';

import moviesApi from '../../utils/MoviesApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [initialMovies, setInitialMovies] = useState([]);
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Виталий', email: 'pochta@yandex.ru' });
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isFormValid] = useState(true);
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathsWithHeader = ['/', '/movies', '/saved-movies', '/profile'].includes(pathname);
  const pathsWithFooter = ['/', '/movies', '/saved-movies'].includes(pathname);

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

  // useEffect(() => {
  //   moviesApi.getMovies().then((movies) => {
  //     setInitialMovies(movies);
  //   });
  // }, []);

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

  function handleNavigateToSignup() {
    navigate('/signup');
  }

  function handleNavigateToSignin() {
    navigate('/signin');
  }

  function handleNavigateToProfile() {
    navigate('/profile');
  }

  function handleNavigateToMain() {
    navigate('/');
  }

  function handleChekIsCheckboxChecked(checked) {
    setIsCheckBoxChecked(checked);
  }

  async function handleFindMovies(value) {
    try {
      setIsLoading(true);
      const movies = await moviesApi.getMovies();
      localStorage.setItem('movies', JSON.stringify(movies));
      localStorage.setItem('userRequest', value);
      localStorage.setItem('IsCheckBoxChecked', isCheckBoxChecked);
      const userRequest = localStorage.getItem('userRequest');
      const allMovies = JSON.parse(localStorage.getItem('movies'));
      const foundMovies = allMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(userRequest.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(userRequest.toLowerCase()),
      );
      setInitialMovies(foundMovies.slice(0, 12));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__content'>
          {pathsWithHeader && (
            <Header
              isLoggedIn={isLoggedIn}
              isBurgerMenuOpen={isBurgerMenuOpen}
              onBurgerMenuOpen={handleOpenBurgerMenu}
              onBurgerMenuClose={handleCloseBurgerMenu}
              onNavigateToSignup={handleNavigateToSignup}
              onNavigateToSignin={handleNavigateToSignin}
              onNavigateToProfile={handleNavigateToProfile}
            ></Header>
          )}
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route
              path='/movies'
              element={
                <ProtectedRouteElement
                  element={Movies}
                  loggedIn={isLoggedIn}
                  moviesCards={initialMovies}
                  onFindMovies={handleFindMovies}
                  onChekIsCheckboxChecked={handleChekIsCheckboxChecked}
                  checked={localStorage.getItem('IsCheckBoxChecked')}
                  isMovieSaved={isMovieSaved}
                  onSaveMovie={handleSaveMovie}
                  isLoading={isLoading}
                />
              }
            ></Route>
            <Route
              path='/saved-movies'
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={isLoggedIn}
                  moviesCards={initialMovies.slice(0, 3)}
                  onChekIsCheckboxChecked={handleChekIsCheckboxChecked}
                  isLoading={isLoading}
                />
              }
            ></Route>
            <Route
              path='/profile'
              element={
                <ProtectedRouteElement
                  element={Profile}
                  loggedIn={isLoggedIn}
                  user={currentUser}
                  isEdit={isProfileEdit}
                  onSubmit={hadleProfileSubmit}
                  onEditProfile={handleEditProfile}
                  onSignOut={handleSignOut}
                  isFormValid={isFormValid}
                />
              }
            ></Route>
            <Route path='/signin' element={<Login onSubmit={handleSignIn} isFormValid={isFormValid} />}></Route>
            <Route path='/signup' element={<Register onSubmit={handleSignUp} isFormValid={isFormValid} />}></Route>
            <Route path='*' element={<PageNotFound onNavigateToMain={handleNavigateToMain} />}></Route>
          </Routes>
          {pathsWithFooter && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

import './App.css';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

import { handleFilterShortMovies } from '../../utils/utils';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { ZERO_CARDS } from '../../utils/configs/cardsConfig';

function App() {
  // Стейт данных пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Стейты фильмов
  const [foundMovies, setFoundMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);

  // Стейт авторизации пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Стейт бургер-меню
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  // Стейты загрузки
  const [isLoading, setIsLoading] = useState(true);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [isSavedMoviesLoading, setIsSavedMoviesLoading] = useState(false);

  // Стейт поиска пользователя
  const [isSearch, setisSearch] = useState(false);

  // Стейт редактирования профиля
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  // Стейты запросов
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(true);
  const [isUserRequestSuccessful, setIsUserRequestSuccessful] = useState(true);
  const [isEditProfileSuccessful, setIsEditProfileSuccessful] = useState(true);
  const [errorText, setErrortext] = useState('');

  // Стейт попапа уведомления
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

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

  const tokenCheck = useCallback(() => {
    const authorized = localStorage.getItem('authorized');
    if (authorized) {
      mainApi
        .getContent()
        .then((userData) => {
          if (userData.email) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    tokenCheck();
    isLoggedIn &&
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userData, savedMovies]) => {
          setCurrentUser(userData);
          setSavedMovies(savedMovies);
          localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
          const userRequest = localStorage.getItem('userRequest');
          userRequest ? setisSearch(true) : setisSearch(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [isLoggedIn, tokenCheck]);

  useEffect(() => {
    const storedSavedMovies = JSON.parse(localStorage.getItem('saved-movies'));
    if (storedSavedMovies && pathname === '/saved-movies') {
      setSavedMovies(storedSavedMovies);
    }
  }, [pathname]);

  async function handleSignUp(values) {
    setIsRegisterLoading(true);
    setErrortext('');
    const { name, email, password } = values;
    try {
      const signUpdata = await mainApi.register(name, email, password);
      if (signUpdata) {
        handleSignIn(values);
      }
    } catch (err) {
      console.log(err);
      setIsRequestSuccessful(false);
      setErrortext(err);
    } finally {
      setTimeout(() => {
        setIsRegisterLoading(false);
      }, 1500);
    }
  }

  async function handleSignIn(values) {
    setIsLoginLoading(true);
    setErrortext('');
    if (!values.email || !values.password) {
      return;
    }
    try {
      const signInData = await mainApi.authorize(values.email, values.password);
      if (signInData.message) {
        setIsLoggedIn(true);
        localStorage.setItem('authorized', 'true');
        navigate('/movies', { replace: true });
      }
    } catch (err) {
      console.log(err);
      setIsRequestSuccessful(false);
      setErrortext(err);
    } finally {
      setTimeout(() => {
        setIsLoginLoading(false);
      }, 1500);
    }
  }

  async function handleSignOut() {
    try {
      await mainApi.signout();
      localStorage.clear();
      setIsLoggedIn(false);
      setCurrentUser({});
      setSavedMovies([]);
      setIsBurgerMenuOpen(false);
      setFoundMovies([]);
      setInitialMovies([]);
      setisSearch(false);
      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  function handleOpenBurgerMenu() {
    setIsBurgerMenuOpen(true);
  }

  function handleCloseBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  function handleOpenInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleCloseInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleEditProfile() {
    setIsProfileEdit(true);
  }

  async function hadleProfileSubmit(values) {
    setIsProfileEdit(true);
    setIsProfileLoading(true);
    try {
      const userData = await mainApi.editProfile(values.name, values.email);
      setCurrentUser(userData);
      handleOpenInfoTooltip();
    } catch (err) {
      console.log(err);
      setIsEditProfileSuccessful(false);
      setErrortext(err);
      handleOpenInfoTooltip();
    } finally {
      setIsProfileEdit(false);
      setTimeout(() => {
        setIsProfileLoading(false);
      }, 1500);
    }
  }

  function handleCleanErrorText() {
    setErrortext('');
  }



  async function handleMoviesSubmit(value) {
    setIsMoviesLoading(true);
    !isSearch && setisSearch(true);
    try {
      if (!JSON.parse(localStorage.getItem('movies'))) {
        const moviesFromBeatFilm = await moviesApi.getMovies();
        localStorage.setItem('movies', JSON.stringify(moviesFromBeatFilm));
      }
      localStorage.setItem('userRequest', value);
      const foundMovies = JSON.parse(localStorage.getItem('movies')).filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(value.toLowerCase()),
      );
      localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
      setFoundMovies(foundMovies); // этот стейт нужен для того, чтобы фильтровать фильмы в функции фильтрации
      const checkboxState = localStorage.getItem('checkboxState');
      if (checkboxState === 'true') {
        const filteredFoundMovies = handleFilterShortMovies(foundMovies)
        setInitialMovies(filteredFoundMovies);
      } else {
        setInitialMovies(foundMovies);
      }
      !isUserRequestSuccessful && setIsUserRequestSuccessful(true);
    } catch (err) {
      setIsUserRequestSuccessful(false);
      console.log(err);
    } finally {
      setIsMoviesLoading(false);
    }
  }

  function handlSavedMoviesSubmit(value) {
    setIsSavedMoviesLoading(true);
    const storedSavedMovies = JSON.parse(localStorage.getItem('saved-movies'));
    if (storedSavedMovies && storedSavedMovies.length > ZERO_CARDS) {
      const foundSavedMovies = JSON.parse(localStorage.getItem('saved-movies')).filter(
        (savedMovie) =>
          savedMovie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
          savedMovie.nameEN.toLowerCase().includes(value.toLowerCase()),
      );
      setFoundSavedMovies(foundSavedMovies);
      const checkboxState = localStorage.getItem('checkboxState');
      if (checkboxState === 'true') {
        const filteredFoundSavedMovies = handleFilterShortMovies(foundSavedMovies)
        setSavedMovies(filteredFoundSavedMovies);
      } else {
        setSavedMovies(foundSavedMovies);
      }
    }
    setIsSavedMoviesLoading(false);
  }

  function handleFilterMovies(checked) {
    localStorage.setItem('checkboxState', checked);
    const storedMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const filteredFoundMovies = handleFilterShortMovies(foundSavedMovies)
    const filteredStoredMovies =
      storedMovies &&
      storedMovies.length > ZERO_CARDS &&
      handleFilterShortMovies(storedMovies)
    if (checked) {
      setInitialMovies(foundMovies.length > ZERO_CARDS ? filteredFoundMovies : filteredStoredMovies);
    } else {
      setInitialMovies(foundMovies.length > ZERO_CARDS ? foundMovies : storedMovies);
    }
  }

  function handleFilterSavedMovies(checked) {
    const filteredFoundSavedMovies = handleFilterShortMovies(foundSavedMovies);
    const storedSavedMovies = JSON.parse(localStorage.getItem('saved-movies'))
      ? JSON.parse(localStorage.getItem('saved-movies'))
      : [];
    const filteredSavedMovies = handleFilterShortMovies(savedMovies);
    if (checked) {
      setSavedMovies(foundSavedMovies.length > ZERO_CARDS ? filteredFoundSavedMovies : filteredSavedMovies);
    } else {
      setSavedMovies(foundSavedMovies.length > ZERO_CARDS ? foundSavedMovies : storedSavedMovies);
    }
  }

  async function handleSaveMovie(movie) {
    try {
      const isMovieInSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);
      if (!isMovieInSaved) {
        const savedMovie = await mainApi.saveMovie(movie);
        const updatedSavedMovies = [...savedMovies, savedMovie];
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem('saved-movies', JSON.stringify(updatedSavedMovies));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteMovie(movieId) {
    try {
      await mainApi.deleteMovie(movieId);
      const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== movieId);
      setSavedMovies(updatedSavedMovies);
      localStorage.setItem('saved-movies', JSON.stringify(updatedSavedMovies));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className='page'>
          <div className='page__content'>
            {pathsWithHeader && (
              <Header
                isLoggedIn={isLoggedIn}
                isBurgerMenuOpen={isBurgerMenuOpen}
                onBurgerMenuOpen={handleOpenBurgerMenu}
                onBurgerMenuClose={handleCloseBurgerMenu}
              ></Header>
            )}
            <Routes>
              <Route path='/' element={<Main />} />
              <Route
                path='/movies'
                element={
                  <ProtectedRouteElement
                    element={Movies}
                    loggedIn={isLoggedIn}
                    initialMoviesCards={initialMovies}
                    onSubmit={handleMoviesSubmit}
                    checked={localStorage.getItem('IsCheckBoxChecked')}
                    onSaveMovie={handleSaveMovie}
                    onDeleteMovie={handleDeleteMovie}
                    onFilter={handleFilterMovies}
                    isLoading={isMoviesLoading}
                    savedMovies={savedMovies}
                    didTheUserSearch={isSearch}
                    isRequestSuccessful={isUserRequestSuccessful}
                  />
                }
              />
              <Route
                path='/saved-movies'
                element={
                  <ProtectedRouteElement
                    element={SavedMovies}
                    loggedIn={isLoggedIn}
                    moviesCards={savedMovies}
                    onSubmit={handlSavedMoviesSubmit}
                    onDeleteMovie={handleDeleteMovie}
                    onFilter={handleFilterSavedMovies}
                    isLoading={isSavedMoviesLoading}
                    didTheUserSearch={isSearch}
                    isRequestSuccessful={isUserRequestSuccessful}
                  />
                }
              />
              <Route
                path='/profile'
                element={
                  <ProtectedRouteElement
                    element={Profile}
                    loggedIn={isLoggedIn}
                    isEdit={isProfileEdit}
                    isLoading={isProfileLoading}
                    onSubmit={hadleProfileSubmit}
                    onEditProfile={handleEditProfile}
                    onSignOut={handleSignOut}
                  />
                }
              />
              <Route
                path='/signup'
                element={
                  <Register
                    name='register'
                    onSignup={handleSignUp}
                    isRequestSuccessful={isRequestSuccessful}
                    errorText={errorText}
                    onCleanErrorText={handleCleanErrorText}
                    isLoading={isRegisterLoading}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path='/signin'
                element={
                  <Login
                    name='login'
                    onSignin={handleSignIn}
                    isRequestSuccessful={isRequestSuccessful}
                    errorText={errorText}
                    onCleanErrorText={handleCleanErrorText}
                    isLoading={isLoginLoading}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            {pathsWithFooter && <Footer />}
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={handleCloseInfoTooltip}
              name='register'
              isSuccess={isEditProfileSuccessful}
              errorText={errorText}
            />
          </div>
        </div>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;

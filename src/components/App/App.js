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
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import './App.css';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

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
  const [didTheUserSearch, setDidTheUserSearch] = useState(false);

  // Стейт редактирования профиля
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  // Стейты запросов
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(true);
  const [isUserRequestSuccessful, setIsUserRequestSuccessful] = useState(true);
  const [errorText, setErrortext] = useState('');

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
          if (userRequest) {
            setDidTheUserSearch(true);
          } else {
            setDidTheUserSearch(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, [isLoggedIn, tokenCheck]);

  useEffect(() => {
    const storedSavedMovies = JSON.parse(localStorage.getItem('saved-movies'));
    pathname === '/saved-movies' && setSavedMovies(storedSavedMovies);
  }, [pathname]);

  function handleSignUp(values) {
    setIsRegisterLoading(true);
    setErrortext('');
    const { name, email, password } = values;
    return mainApi
      .register(name, email, password)
      .then(() => {
        setIsLoggedIn(true);
        localStorage.setItem('authorized', 'true');
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsRequestSuccessful(false);
        setErrortext(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsRegisterLoading(false);
        }, 1500);
      });
  }

  function handleSignIn(values) {
    setIsLoginLoading(true);
    setErrortext('');
    if (!values.email || !values.password) {
      return;
    }
    mainApi
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.message) {
          setIsLoggedIn(true);
          localStorage.setItem('authorized', 'true');
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRequestSuccessful(false);
        setErrortext(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoginLoading(false);
        }, 1500);
      });
  }

  function handleSignOut() {
    mainApi
      .signout()
      .then(() => {
        localStorage.clear();
        setIsLoggedIn(false);
        setIsBurgerMenuOpen(false);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
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

  function hadleProfileSubmit(values) {
    setIsProfileEdit(true);
    setIsProfileLoading(true);
    mainApi
      .editProfile(values.name, values.email)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsProfileEdit(false);
        setTimeout(() => {
          setIsProfileLoading(false);
        }, 1500);
      });
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

  function handleNavigateBack() {
    navigate(-1);
  }

  function handleCleanErrorText() {
    setErrortext('');
  }

  async function handleMoviesSubmit(value) {
    setIsMoviesLoading(true);
    !didTheUserSearch && setDidTheUserSearch(true);
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
        const filteredFoundMovies = foundMovies.filter((movie) => movie.duration <= 40);
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
    if (storedSavedMovies && storedSavedMovies.length > 0) {
      const foundSavedMovies = JSON.parse(localStorage.getItem('saved-movies')).filter(
        (savedMovie) =>
          savedMovie.nameRU.toLowerCase().includes(value.toLowerCase()) ||
          savedMovie.nameEN.toLowerCase().includes(value.toLowerCase()),
      );
      setFoundSavedMovies(foundSavedMovies);
      const checkboxState = localStorage.getItem('checkboxState');
      if (checkboxState === 'true') {
        const filteredFoundSavedMovies = foundSavedMovies.filter((movie) => movie.duration <= 40);
        setSavedMovies(filteredFoundSavedMovies);
      } else {
        setSavedMovies(foundSavedMovies);
      }
    }
    setIsSavedMoviesLoading(false);
  }

  function handleFilterMovies(checked) {
    const storedMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const filteredFoundMovies = foundMovies.filter((movie) => movie.duration <= 40);
    const filteredStoredMovies =
      storedMovies && storedMovies.length > 0 && storedMovies.filter((movie) => movie.duration <= 40);
    if (!checked) {
      setInitialMovies(foundMovies.length > 0 ? filteredFoundMovies : filteredStoredMovies);
    } else {
      setInitialMovies(foundMovies.length > 0 ? foundMovies : storedMovies);
    }
  }

  function handleFilterSavedMovies(checked) {
    console.log(foundSavedMovies);
    const filteredFoundSavedMovies = foundSavedMovies.filter((movie) => movie.duration <= 40);
    const storedSavedMovies = JSON.parse(localStorage.getItem('saved-movies'));
    const filteredSavedMovies = savedMovies.filter((movie) => movie.duration <= 40);
    if (!checked) {
      setSavedMovies(foundSavedMovies.length > 0 ? filteredFoundSavedMovies : filteredSavedMovies);
    } else {
      setSavedMovies(foundSavedMovies.length > 0 ? foundSavedMovies : storedSavedMovies);
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
                onNavigateToSignup={handleNavigateToSignup}
                onNavigateToSignin={handleNavigateToSignin}
                onNavigateToProfile={handleNavigateToProfile}
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
                    moviesCards={initialMovies}
                    onSubmit={handleMoviesSubmit}
                    checked={localStorage.getItem('IsCheckBoxChecked')}
                    onSaveMovie={handleSaveMovie}
                    onDeleteMovie={handleDeleteMovie}
                    onFilter={handleFilterMovies}
                    isLoading={isMoviesLoading}
                    savedMovies={savedMovies}
                    didTheUserSearch={didTheUserSearch}
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
                    didTheUserSearch={didTheUserSearch}
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
              <Route path='*' element={<PageNotFound onNavigateToMain={handleNavigateBack} />} />
            </Routes>
            {pathsWithFooter && <Footer />}
          </div>
        </div>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;

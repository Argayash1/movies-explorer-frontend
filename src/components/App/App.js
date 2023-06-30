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
  const [initialMovies, setInitialMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isMovieSaved, setIsMovieSaved] = useState(false);

  // Стейт авторизации пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Стейт бургер-меню
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  // Стейты загрузки
  const [isLoading, setIsLoading] = useState(true);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isMoviesLoading, setisMoviesLoading] = useState(false);

  // Стейт редактирования профиля
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);

  // Стейты запросов
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(true);
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
    // если пользователь авторизован,
    // эта функция проверит, есть ли данные в req.user._id на сервере
    const authorized = localStorage.getItem('authorized');
    if (authorized) {
      // проверим, есть ли данные в req.user._id
      mainApi
        .getContent()
        .then((userData) => {
          if (userData.email) {
            console.log(userData);
            // авторизуем пользователя
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
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
          console.log(userData);
          setCurrentUser(userData);
          setSavedMovies(savedMovies);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
  }, [isLoggedIn, tokenCheck]);

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
        localStorage.removeItem('authorized');
        setIsLoggedIn(false);
        navigate('/', { replace: true });
        setIsBurgerMenuOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
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

  function hadleProfileSubmit(values) {
    setIsProfileEdit(false);
    setIsProfileLoading(true);
    mainApi
      .editProfile(values.name, values.email)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
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

  function handleChekIsCheckboxChecked(checked) {
    setIsCheckBoxChecked(checked);
  }

  function handleCleanErrorText() {
    setErrortext('');
  }

  async function handleFindMovies(value) {
    try {
      setisMoviesLoading(true);
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
      setisMoviesLoading(false);
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
                    onFindMovies={handleFindMovies}
                    onChekIsCheckboxChecked={handleChekIsCheckboxChecked}
                    checked={localStorage.getItem('IsCheckBoxChecked')}
                    isMovieSaved={isMovieSaved}
                    onSaveMovie={handleSaveMovie}
                    isLoading={isMoviesLoading}
                  />
                }
              />
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
              />
              <Route
                path='/profile'
                element={
                  <ProtectedRouteElement
                    element={Profile}
                    loggedIn={isLoggedIn}
                    isEdit={isProfileEdit}
                    onSubmit={hadleProfileSubmit}
                    onEditProfile={handleEditProfile}
                    onSignOut={handleSignOut}
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

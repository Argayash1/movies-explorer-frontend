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

function App() {
  const [initialMovies, setInitialMovies] = useState([]);
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isFormValid] = useState(true);
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

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
            // авторизуем пользователя
            setIsLoggedIn(true);
            navigate('/', { replace: true });
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
  }, [navigate]);

  useEffect(() => {
    tokenCheck();
    isLoggedIn &&
      Promise.all([mainApi.getUserInfo()])
        .then(([userData]) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
  }, [isLoggedIn, tokenCheck]);

  function handleSignUp(values) {
    setIsRegisterLoading(true);
    const { name, email, password } = values;
    console.log(values);
    return mainApi
      .register(name, email, password)
      .then((res) => {
        navigate('/signin', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsRegisterLoading(false);
        }, 1500);
      });
  }

  function handleSignIn(values) {
    setIsLoginLoading(true);
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
                  isLoading={isLoading}
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
                  isFormValid={isFormValid}
                />
              }
            />
            <Route path='/signin' element={<Login name='login' onSignin={handleSignIn} isLoading={isLoginLoading} />} />
            <Route
              path='/signup'
              element={<Register name='register' onSignup={handleSignUp} isLoading={isRegisterLoading} />}
            />
            <Route path='*' element={<PageNotFound onNavigateToMain={handleNavigateToMain} />} />
          </Routes>
          {pathsWithFooter && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

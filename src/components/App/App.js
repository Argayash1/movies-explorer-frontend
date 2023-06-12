import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // импортируем Routes
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';

import moviesApi from '../../utils/MoviesApi';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function App() {
  const [initialMovies, setInitialMovies] = useState([]);
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  useEffect(() => {
    moviesApi.getMovies().then((movies) => {
      setInitialMovies(movies);
    });
  }, []);

  function handleSaveMovie() {
    setIsMovieSaved(!isMovieSaved);
  }

  function handleOpenBurgerMenu() {
    setIsBurgerMenuOpen(true);
  }

  function handleClosrBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  return (
    <div className='page'>
      <div className='page__content'>
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
            element={<Profile isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuOpen={handleOpenBurgerMenu} />}
          ></Route>
          <Route path='/signin' element={<Login />}></Route>
          <Route path='/signup' element={<Register />}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
        <BurgerMenu
          isOpen={isBurgerMenuOpen}
          onBurgerMenuOpen={handleOpenBurgerMenu}
          onBurgerMenuClose={handleClosrBurgerMenu}
        />
      </div>
    </div>
  );
}

export default App;

// TODO: Не забыть исправить gap на 24 пикселя в грид-контейнере карточек в разделе "Фильмы"

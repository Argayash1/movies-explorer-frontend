import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Movies({
  initialMoviesCards, // это найденные фильмы, которые передаются из app после каждого поиска
  onSubmit,
  onSaveMovie,
  onDeleteMovie,
  onFilter,
  isLoading,
  isMovieInSaved,
  savedMovies,
  didTheUserSearch,
  isRequestSuccessful,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [moviesCards, setMoviesCards] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  let [items, setItems] = useState(0);
  const [moviesRequest, setMoviesRequest] = useState('');
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);

  const { pathname } = useLocation();

  const showMoreButton =
    pathname === '/movies' && moviesCards && moviesCards.length > 3 && moviesToShow.length !== moviesCards.length;

  const handleSetMovieCardsLength = useCallback(() => {
    const currentItems = items;
    if (screenWidth >= 1280) {
      return moviesCards.slice(0, currentItems + 12);
    }
    if (screenWidth > 480 && screenWidth < 1280) {
      return moviesCards.slice(0, currentItems + 8);
    }
    if (screenWidth >= 320 || screenWidth <= 480) {
      return moviesCards.slice(0, currentItems + 5);
    }
  }, [moviesCards, screenWidth, items]);

  useEffect(() => {
    setMoviesRequest(localStorage.getItem('userRequest'));
    setIsCheckBoxChecked(JSON.parse(localStorage.getItem('checkboxState')));
  }, []);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('foundMovies')) || [];
    if (initialMoviesCards && initialMoviesCards.length > 0) {
      setMoviesCards(initialMoviesCards);
    } else {
      const checkboxState = localStorage.getItem('checkboxState');
      const filteredStoredMovies = storedMovies.length > 0 ? storedMovies.filter((movie) => movie.duration <= 40) : [];
      setMoviesCards(checkboxState === 'true' ? filteredStoredMovies : storedMovies);
    }
  }, [initialMoviesCards]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    let timeoutId;

    const delayedHandleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        handleResize();
      }, 500);
    };

    window.addEventListener('resize', delayedHandleResize);

    return () => {
      window.removeEventListener('resize', delayedHandleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    setMoviesToShow(handleSetMovieCardsLength());
  }, [handleSetMovieCardsLength]);

  const handleShowMoreMovies = useCallback(() => {
    if (screenWidth >= 1280) {
      setItems((prevItems) => prevItems + 3);
    }

    if (screenWidth >= 320 && screenWidth < 1280) {
      setItems((prevItems) => prevItems + 2);
    }
  }, [screenWidth]);

  useEffect(() => {
    const visibleMoviesCards = handleSetMovieCardsLength();
    setMoviesToShow(visibleMoviesCards);
  }, [handleSetMovieCardsLength]);

  useEffect(() => {
    setItems(0);
  }, [moviesCards]);

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={onSubmit}
        onFilter={onFilter}
        moviesRequest={moviesRequest}
        isCheckBoxChecked={isCheckBoxChecked}
      />
      {isLoading && <Preloader />}
      {!isLoading && didTheUserSearch && (
        <MoviesCardList
          movies={moviesToShow}
          buttonType='save'
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          onShowMoreMovies={handleShowMoreMovies}
          place='movies'
          isMovieInSaved={isMovieInSaved}
          savedMovies={savedMovies}
          isRequestSuccessful={isRequestSuccessful}
          showMoreButton={showMoreButton}
        />
      )}
    </main>
  );
}

export default Movies;

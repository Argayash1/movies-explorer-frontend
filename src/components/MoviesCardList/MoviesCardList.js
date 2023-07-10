import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

function MoviesCardList({
  initialMoviesCards,
  buttonType,
  onSaveMovie,
  onDeleteMovie,
  place,
  isMovieInSaved,
  movieIdForDelete,
  savedMovies,
  isRequestSuccessful,
}) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [moviesCards, setMoviesCards] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  let [items, setItems] = useState(0);

  const { pathname } = useLocation();

  const showMoreButton =
    pathname === '/movies' && moviesCards && moviesCards.length > 3 && moviesToShow.length !== moviesCards.length;

  const handleSetMovieCardsLength = useCallback(() => {
    if (pathname !== '/saved-movies') {
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
    } else {
      return moviesCards;
    }
  }, [moviesCards, screenWidth, items, pathname]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('foundMovies'));
    if (pathname === '/saved-movies' || (initialMoviesCards && initialMoviesCards.length > 0)) {
      setMoviesCards(initialMoviesCards);
    } else {
      const checkboxState = localStorage.getItem('checkboxState');
      const filteredStoredMovies =
        storedMovies && storedMovies.length > 0 && storedMovies.filter((movie) => movie.duration <= 40);
      setMoviesCards(checkboxState === 'true' ? filteredStoredMovies : storedMovies);
    }
  }, [initialMoviesCards, pathname]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.screen.width);
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
    const screenWidth = window.screen.width;
    setScreenWidth(screenWidth);
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

  const movieCardElements = moviesToShow.map((movieCard) => (
    <li key={movieCard.id || movieCard._id}>
      <MoviesCard
        movieCard={movieCard}
        buttonType={buttonType}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        place={place}
        isMovieInSaved={isMovieInSaved}
        movieIdForDelete={movieIdForDelete}
        IsSaved={pathname === '/movies' ? savedMovies.some((savedMovie) => savedMovie.movieId === movieCard.id) : false}
        savedMovies={savedMovies}
      />
    </li>
  ));

  return (
    <section className={`movies-card-list ${place === 'saved-movies' ? 'movies-card-list_place_saved-movies' : ''}`}>
      {moviesCards.length === 0 ? (
        <p
          className={`movies-card-list__not-found ${
            !isRequestSuccessful ? 'movies-card-list__not-found_req_unsuccsessful' : ''
          }`}
        >
          {!isRequestSuccessful
            ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
            : 'Ничего не найдено'}
        </p>
      ) : (
        <ul className='movies-card-list__cards'>{movieCardElements}</ul>
      )}
      {showMoreButton && (
        <button className='movies-card-list__button' type='button' onClick={handleShowMoreMovies}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;

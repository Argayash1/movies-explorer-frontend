import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

function MoviesCardList({
  moviesCards,
  buttonType,
  onSaveMovie,
  onDeleteMovie,
  place,
  isMovieInSaved,
  movieIdForDelete,
  savedMovies,
}) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [moviesToShow, setMoviesToShow] = useState([]);
  let [items, setItems] = useState(0);

  const { pathname } = useLocation();

  const showMoreButton = pathname === '/movies' && moviesCards.length > 3 && moviesToShow.length !== moviesCards.length;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.screen.width);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    const screenWidth = window.screen.width; // document.documentElement.clientWidth - внутр.разм.окна без полос прокр-ки
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
    setItems(0); // Сбросить значение items при изменении moviesCards
  }, [moviesCards]);

  const movieCardElements = moviesToShow.map((movieCard) => {
    return (
      <li key={movieCard.id || movieCard._id}>
        <MoviesCard
          movieCard={movieCard}
          buttonType={buttonType}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          place={place}
          isMovieInSaved={isMovieInSaved}
          movieIdForDelete={movieIdForDelete}
          IsSaved={
            pathname === '/movies' ? savedMovies.some((savedMovie) => savedMovie.movieId === movieCard.id) : false
          }
          savedMovies={savedMovies}
        />
      </li>
    );
  });

  return (
    <section className={`movies-card-list ${place === 'saved-movies' ? 'movies-card-list_place_saved-movies' : ''}`}>
      {moviesCards.length === 0 ? (
        <p className='movies-card-list__not-found'>Ничего не найдено</p>
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

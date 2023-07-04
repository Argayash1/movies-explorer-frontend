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
  const [showMore, setShowMore] = useState(false);

  const { pathname } = useLocation();

  const handleSetMovieCardsLength = useCallback(() => {
    if (screenWidth <= 1280 && screenWidth >= 768) {
      setItems(12);
      return moviesCards.slice(0, items);
    }

    if (screenWidth <= 768 && screenWidth >= 480) {
      setItems(8);
      return moviesCards.slice(0, items);
    }

    if (screenWidth <= 480 || screenWidth >= 320) {
      setItems(5);
      return moviesCards.slice(0, items);
    }
  }, [moviesCards, screenWidth, items]);

  useEffect(() => {
    const screenWidth = window.screen.width;
    setScreenWidth(screenWidth);
    setMoviesToShow(handleSetMovieCardsLength());
  }, [handleSetMovieCardsLength, items]);

  const handleShowMoreMovies = useCallback(() => {
    setShowMore(true);
    let movieItems = items;
    movieItems = items += 3;
    console.log(moviesCards.slice(0, movieItems));
    return moviesCards.slice(0, movieItems);
  }, [showMore, items]);

  useEffect(() => {
    if (showMore) {
      setMoviesToShow(handleShowMoreMovies());
    }
  }, [handleShowMoreMovies, items, showMore]);

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
            pathname === '/movies' ? savedMovies.some((savedMovie) => savedMovie.nameRU === movieCard.nameRU) : false
          }
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
      {pathname === '/movies' && moviesCards.length > 3 && (
        <button className='movies-card-list__button' type='button' onClick={handleShowMoreMovies}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;

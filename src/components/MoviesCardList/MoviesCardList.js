import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { MOVIES_NOT_FOUND, CONNECTION_OR_SERVER_ERROR } from '../../utils/configs/errorsConfig';
import { ZERO_CARDS } from '../../utils/configs/cardsConfig';

function MoviesCardList({
  movies,
  buttonType,
  onSaveMovie,
  onDeleteMovie,
  onShowMoreMovies,
  place,
  isMovieInSaved,
  movieIdForDelete,
  savedMovies,
  isRequestSuccessful,
  showMoreButton,
}) {
  const { pathname } = useLocation();

  const movieCardElements = movies.map((movieCard) => (
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
      {movies.length === ZERO_CARDS ? (
        <p
          className={`movies-card-list__not-found ${
            !isRequestSuccessful ? 'movies-card-list__not-found_req_unsuccsessful' : ''
          }`}
        >
          {!isRequestSuccessful ? CONNECTION_OR_SERVER_ERROR : MOVIES_NOT_FOUND}
        </p>
      ) : (
        <ul className='movies-card-list__cards'>{movieCardElements}</ul>
      )}
      {showMoreButton && (
        <button className='movies-card-list__button' type='button' onClick={onShowMoreMovies}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;

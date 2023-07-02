import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({
  moviesCards,
  buttonType,
  onSaveMovie,
  onDeleteMovie,
  place,
  isMovieSaved,
  movieIdForDelete,
}) {
  const { pathname } = useLocation();

  const movieCardElements = moviesCards.map((movieCard) => {
    return (
      <li key={movieCard.id || movieCard.movieId}>
        <MoviesCard
          movieCard={movieCard}
          buttonType={buttonType}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          place={place}
          isMovieSaved={isMovieSaved}
          movieIdForDelete={movieIdForDelete}
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
      {pathname === '/movies' && (
        <button className='movies-card-list__button' type='button'>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ moviesCards, buttonType, isMovieSaved, onSaveMovie, place }) {
  const { pathname } = useLocation();

  const movieCardElements = moviesCards.map((movieCard) => {
    return (
      <li key={movieCard.id}>
        <MoviesCard
          movieCard={movieCard}
          buttonType={buttonType}
          onSaveMovie={onSaveMovie}
          isMovieSaved={isMovieSaved}
        />
      </li>
    );
  });

  return (
    <section className={`movies-card-list ${place === 'saved-movies' ? 'movies-card-list_place_saved-movies' : ''}`}>
      {!moviesCards || moviesCards.length === 0 ? (
        <p className='movies-card-list__not-found'>Фильмы по запросу не найдены</p>
      ) : (
        <ul className='movies-card-list__cards'>{movieCardElements}</ul>
      )}
      {pathname === '/movies' && <button className='movies-card-list__button'>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;

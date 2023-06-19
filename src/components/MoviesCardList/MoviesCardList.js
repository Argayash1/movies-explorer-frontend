import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ moviesCards, buttonType, isMovieSaved, onSaveMovie, place }) {
  const location = useLocation();

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
    <section className={`movies-card-list ${place === 'saved-movies' && 'movies-card-list_place_saved-movies'}`}>
      <ul className='movies-card-list__cards'>{movieCardElements}</ul>
      {location.pathname === '/movies' && <button className='movies-card-list__button'>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;

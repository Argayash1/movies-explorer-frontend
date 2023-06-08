import './MoviesCardList.css';
import MovieCsard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ moviesCards }) {
  const location = useLocation();

  const movieCardElements = moviesCards.map((movieCard) => {
    return (
      <li key={movieCard._id}>
        <MovieCsard movieCard={movieCard} />
      </li>
    );
  });

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__cards'>{movieCardElements}</ul>

      <div className='movies-card-list__button'>
        {location.pathname === '/movies' && <button className='movies-card-list__more-button'>Ещё</button>}
      </div>
    </section>
  );
}

export default MoviesCardList;

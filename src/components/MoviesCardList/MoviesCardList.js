import './MoviesCardList.css';
import SectionContent from '../SectionContent/SectionContent';
import MovieCsard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ moviesCards, buttonType, isMovieSaved, onSaveMovie }) {
  const location = useLocation();

  const movieCardElements = moviesCards.map((movieCard) => {
    return (
      <li key={movieCard.id}>
        <MovieCsard
          movieCard={movieCard}
          buttonType={buttonType}
          onSaveMovie={onSaveMovie}
          isMovieSaved={isMovieSaved}
        />
      </li>
    );
  });

  return (
    <section className='movies-card-list'>
      <SectionContent>
        <ul className='movies-card-list__cards'>{movieCardElements}</ul>
        <div className='movies-card-list__button'>
          {location.pathname === '/movies' && <button className='movies-card-list__more-button'>Ещё</button>}
        </div>
      </SectionContent>
    </section>
  );
}

export default MoviesCardList;

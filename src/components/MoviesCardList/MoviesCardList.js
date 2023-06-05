import './MoviesCardList.css';
import MovieCsard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesCards }) {
  const movieCaedElements = moviesCards.map((movieCard) => {
    return (
      <li key={movieCard._id}>
        <MovieCsard movieCard={movieCard} />
      </li>
    );
  });

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__cards'>{movieCaedElements}</ul>
      <div className='movies-card-list__button'>
        <button className='movies-card-list__more-button'>Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;

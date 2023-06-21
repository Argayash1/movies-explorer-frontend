import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({ moviesCards, onSaveMovie, isMovieSaved }) {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList
        moviesCards={moviesCards}
        buttonType='save'
        onSaveMovie={onSaveMovie}
        isMovieSaved={isMovieSaved}
      />
    </main>
  );
}

export default Movies;

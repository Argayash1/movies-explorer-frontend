import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies({ moviesCards, onSaveMovie, isMovieSaved, isLoading }) {
  return (
    <main className='movies'>
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesCards={moviesCards}
          buttonType='save'
          onSaveMovie={onSaveMovie}
          isMovieSaved={isMovieSaved}
        />
      )}
    </main>
  );
}

export default Movies;

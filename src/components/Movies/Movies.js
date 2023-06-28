import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies({ moviesCards, onFindMovies, onSaveMovie, isMovieSaved, isLoading, onChekIsCheckboxChecked, checked }) {
  return (
    <main className='movies'>
      <SearchForm onFindMovies={onFindMovies} onChekIsCheckboxChecked={onChekIsCheckboxChecked} checked={checked} />
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

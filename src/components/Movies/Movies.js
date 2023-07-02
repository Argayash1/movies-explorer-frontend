import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

function Movies({
  hasTheUserSearched,
  moviesCards,
  onFindMovies,
  onSaveMovie,
  onDeleteMovie,
  onFilter,
  isLoading,
  onChekIsCheckboxChecked,
  checked,
  isMovieSaved,
  movieIdForDelete,
}) {
  return (
    <main className='movies'>
      <SearchForm
        onFindMovies={onFindMovies}
        onChekIsCheckboxChecked={onChekIsCheckboxChecked}
        onFilter={onFilter}
        checked={checked}
      />
      {isLoading && <Preloader />}
      {!isLoading && hasTheUserSearched && (
        <MoviesCardList
          moviesCards={moviesCards}
          buttonType='save'
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          place='movies'
          isMovieSaved={isMovieSaved}
          movieIdForDelete={movieIdForDelete}
        />
      )}
    </main>
  );
}

export default Movies;

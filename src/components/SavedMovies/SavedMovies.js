import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

function SavedMovies({
  moviesCards,
  isLoading,
  onDeleteMovie,
  onFilter,
  didTheUserSearch,
  isRequestSuccessful,
  onSubmit,
}) {
  return (
    <main className='saved-movies'>
      <SearchForm onFilter={onFilter} onSubmit={onSubmit} />
      {isLoading && <Preloader />}
      {!isLoading && didTheUserSearch && (
        <MoviesCardList
          initialMoviesCards={moviesCards}
          buttonType='delete'
          place='saved-movies'
          onDeleteMovie={onDeleteMovie}
          didTheUserSearch={didTheUserSearch}
          isRequestSuccessful={isRequestSuccessful}
        />
      )}
    </main>
  );
}

export default SavedMovies;

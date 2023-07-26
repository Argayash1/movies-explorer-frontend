import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';
import { useEffect } from 'react';

function SavedMovies({
  moviesCards,
  isLoading,
  onDeleteMovie,
  onFilter,
  didTheUserSearch,
  isRequestSuccessful,
  onSubmit,
}) {
  const storedSavedMovies = JSON.parse(localStorage.getItem('saved-movies'));

  useEffect(() => {
    document.title = 'Сохранённые фильмы';
  }, []);

  return (
    <main className='saved-movies'>
      <SearchForm onFilter={onFilter} onSubmit={onSubmit} isLoading={isLoading} />
      {isLoading && <Preloader />}
      {!isLoading && storedSavedMovies.length > 0 && (
        <MoviesCardList
          movies={moviesCards}
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

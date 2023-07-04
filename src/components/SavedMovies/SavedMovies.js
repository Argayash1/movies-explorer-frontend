import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

function SavedMovies({ moviesCards, isLoading, onDeleteMovie, onFilter }) {
  return (
    <main className='saved-movies'>
      <SearchForm onFilter={onFilter} />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesCards={moviesCards}
          buttonType='delete'
          place='saved-movies'
          onDeleteMovie={onDeleteMovie}
        />
      )}
    </main>
  );
}

export default SavedMovies;

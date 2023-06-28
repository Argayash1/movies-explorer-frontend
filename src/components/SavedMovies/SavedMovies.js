import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

function SavedMovies({ moviesCards, isLoading }) {
  return (
    <main className='saved-movies'>
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList moviesCards={moviesCards} buttonType='delete' place='saved-movies' />
      )}
    </main>
  );
}

export default SavedMovies;

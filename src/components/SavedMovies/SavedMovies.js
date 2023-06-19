import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({ moviesCards, isBurgerMenuOpen, onBurgerMenuOpen }) {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList moviesCards={moviesCards} buttonType='delete' place='saved-movies' />
    </main>
  );
}

export default SavedMovies;

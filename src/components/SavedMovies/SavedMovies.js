import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies({ moviesCards }) {
  return (
    <main className='saved-movies'>
      <Header />
      <SearchForm />
      <MoviesCardList moviesCards={moviesCards} buttonType='delete' />
      <Footer />
    </main>
  );
}

export default SavedMovies;

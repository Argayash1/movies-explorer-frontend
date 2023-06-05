import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies({ moviesCards }) {
  return (
    <section className='saved-movies'>
      <Header />
      <SearchForm />
      <MoviesCardList moviesCards={moviesCards} />
      <Footer />
    </section>
  );
}

export default SavedMovies;

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies({ moviesCards, onSaveMovie, isMovieSaved }) {
  return (
    <main className='movies'>
      <Header />
      <SearchForm />
      <MoviesCardList
        moviesCards={moviesCards}
        buttonType='save'
        onSaveMovie={onSaveMovie}
        isMovieSaved={isMovieSaved}
      />
      <Footer />
    </main>
  );
}

export default Movies;

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies({ moviesCards, onSaveMovie, isMovieSaved, isBurgerMenuOpen, onBurgerMenuOpen }) {
  return (
    <main className='movies'>
      <Header isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuOpen={onBurgerMenuOpen} />
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

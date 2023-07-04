import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import { useEffect, useState } from 'react';

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
  isMovieInSaved,
  movieIdForDelete,
  savedMovies,
}) {
  const [userRequest, setuserRequest] = useState('');
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);

  useEffect(() => {
    setuserRequest(localStorage.getItem('userRequest'));
    setIsCheckBoxChecked(localStorage.getItem('IsCheckBoxChecked'));
    setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')));
  }, []);

  return (
    <main className='movies'>
      <SearchForm
        onFindMovies={onFindMovies}
        onChekIsCheckboxChecked={onChekIsCheckboxChecked}
        onFilter={onFilter}
        checked={isCheckBoxChecked}
        userRequest={userRequest}
      />
      {isLoading && <Preloader />}
      {!isLoading && hasTheUserSearched && (
        <MoviesCardList
          moviesCards={moviesCards}
          buttonType='save'
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          place='movies'
          isMovieInSaved={isMovieInSaved}
          movieIdForDelete={movieIdForDelete}
          savedMovies={savedMovies}
        />
      )}
    </main>
  );
}

export default Movies;

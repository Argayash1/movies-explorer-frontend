import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import { useEffect, useState } from 'react';

function Movies({
  moviesCards,
  onSubmit,
  onSaveMovie,
  onDeleteMovie,
  onFilter,
  isLoading,
  isMovieInSaved,
  savedMovies,
  didTheUserSearch,
  isRequestSuccessful,
}) {
  const [moviesRequest, setMoviesRequest] = useState('');
  const [foundMovies, setFoundMovies] = useState([]);

  useEffect(() => {
    setMoviesRequest(localStorage.getItem('userRequest'));
    setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')));
  }, [moviesCards]);

  return (
    <main className='movies'>
      <SearchForm onSubmit={onSubmit} onFilter={onFilter} moviesRequest={moviesRequest} />
      {isLoading && <Preloader />}
      {!isLoading && didTheUserSearch && (
        <MoviesCardList
          initialMoviesCards={moviesCards}
          buttonType='save'
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          place='movies'
          isMovieInSaved={isMovieInSaved}
          savedMovies={savedMovies}
          isRequestSuccessful={isRequestSuccessful}
        />
      )}
    </main>
  );
}

export default Movies;

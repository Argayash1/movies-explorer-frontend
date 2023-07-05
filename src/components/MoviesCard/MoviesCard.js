import { useState, useEffect } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movieCard, buttonType, onSaveMovie, onDeleteMovie, place, IsSaved, savedMovies }) {
  const [isMovieSaved, setIsMovieSaved] = useState(IsSaved ? true : false);
  const [movieIdForDelete, setMovieIdForDelete] = useState('');

  const { pathname } = useLocation();
  const moviePath = pathname === '/movies';

  const onClickOnMoviePath = isMovieSaved ? handleDeleteMovie : handleSaveMovie;

  const movie = Object.assign({}, movieCard);
  movie.image = Object.assign({}, movieCard.image);
  movie.image = place === 'saved-movies' ? movieCard.image : `https://api.nomoreparties.co${movieCard.image.url}`;
  movie.thumbnail = movieCard.thumbnail || `https://api.nomoreparties.co${movieCard.image.formats.thumbnail.url}`;
  movie.movieId = movie.id;

  function handleGetDurationFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  }

  function handleSaveMovie() {
    onSaveMovie(movie);
    setIsMovieSaved(true);
  }

  function handleDeleteMovie() {
    onDeleteMovie(movieIdForDelete || movie._id);
    setIsMovieSaved(false);
  }

  useEffect(() => {
    const savedFilm = savedMovies.find((savedFilm) => savedFilm?.movieId === movieCard.id);
    setMovieIdForDelete(savedFilm?._id);
  }, [savedMovies, movieCard.id]);

  return (
    <div className='moviescard'>
      <h2 className='moviescard__title'>{movie.nameRU}</h2>
      <p className='moviescard__duration'>{handleGetDurationFromMins(movie.duration)}</p>
      <button
        className={`moviescard__button moviescard__button_type_${buttonType}  
          ${isMovieSaved ? 'moviescard__button_active' : ''}`}
        type='button'
        onClick={moviePath ? onClickOnMoviePath : handleDeleteMovie}
      ></button>
      <a href={movieCard.trailerLink} target='_blank' rel='noreferrer'>
        <img className='moviescard__image' src={movie.image} alt={movie.nameRU} />
      </a>
    </div>
  );
}

export default MoviesCard;

import { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movieCard, buttonType, onSaveMovie, onDeleteMovie, place, movieIdForDelete, IsSaved }) {
  const { pathname } = useLocation();
  const moviePath = pathname === '/movies';
  const onClickOnMoviePath = IsSaved ? handleDeleteMovie : handleSaveMovie;
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
  }

  function handleDeleteMovie() {
    onDeleteMovie(movieIdForDelete || movie._id);
  }

  return (
    <div className='moviescard'>
      <h2 className='moviescard__title'>{movie.nameRU}</h2>
      <p className='moviescard__duration'>{handleGetDurationFromMins(movie.duration)}</p>
      <button
        className={`moviescard__button moviescard__button_type_${buttonType}  
          ${IsSaved ? 'moviescard__button_active' : ''}`}
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

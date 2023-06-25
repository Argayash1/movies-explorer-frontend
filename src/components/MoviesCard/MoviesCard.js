import './MoviesCard.css';

function MoviesCard({ movieCard, buttonType, isMovieSaved, onSaveMovie }) {
  const imageUrl = `https://api.nomoreparties.co/${movieCard.image.url}`;

  function getDurationFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  }

  return (
    <div className='moviescard'>
      <h2 className='moviescard__title'>{movieCard.nameRU}</h2>
      <p className='moviescard__duration'>{getDurationFromMins(movieCard.duration)}</p>
      <button
        className={`moviescard__button moviescard__button_type_${buttonType}  
          ${isMovieSaved ? 'moviescard__button_active' : ''}`}
        type='button'
        onClick={onSaveMovie}
      ></button>
      <a href={movieCard.trailerLink} target='_blank' rel='noreferrer'>
        <img className='moviescard__image' src={imageUrl} alt={movieCard.nameRU} />
      </a>
    </div>
  );
}

export default MoviesCard;

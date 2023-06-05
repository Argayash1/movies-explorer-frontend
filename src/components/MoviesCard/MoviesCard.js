import './MoviesCard.css';

function MoviesCard({ movieCard }) {
  const imageUrl = `https://api.nomoreparties.co/${movieCard.image.url}`;
  return (
    <>
      <div className='moviescard'>
        <h3 className='moviescard__title'>{movieCard.nameRU}</h3>
        <p className='moviescard__duration'>{movieCard.duration}</p>
        <button className='moviescard__like-button' type='button'></button>
      </div>
      <img className='moviescard__image' src={imageUrl} alt={movieCard.nameRU} />
    </>
  );
}

export default MoviesCard;

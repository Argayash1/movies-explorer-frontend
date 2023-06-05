import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PagNotFound() {
  return (
    <section className='not-found'>
      <h2 className='not-found__title'>404</h2>
      <p className='not-found__text'>Страница не найдена</p>
      <Link className='not-found__button' to='/'>
        Назад
      </Link>
    </section>
  );
}

export default PagNotFound;

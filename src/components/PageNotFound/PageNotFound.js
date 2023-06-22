import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PagNotFound() {
  return (
    <main className='not-found'>
      <section className='not-found__content'>
        <h2 className='not-found__title'>404</h2>
        <p className='not-found__text'>Страница не найдена</p>
        <Link to='/' className='not-found__button'>
          Назад
        </Link>
      </section>
    </main>
  );
}

export default PagNotFound;

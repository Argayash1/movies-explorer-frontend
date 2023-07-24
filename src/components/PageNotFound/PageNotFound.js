import { useEffect } from 'react';
import './PageNotFound.css';

function PagNotFound({ onNavigateToMain }) {
  useEffect(() => {
    document.title = 'Страница не найдена';
  });

  return (
    <main className='not-found'>
      <section className='not-found__content'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
        <button type='button' className='not-found__button' onClick={onNavigateToMain}>
          Назад
        </button>
      </section>
    </main>
  );
}

export default PagNotFound;

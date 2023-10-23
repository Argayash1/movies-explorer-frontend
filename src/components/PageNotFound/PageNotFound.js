import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PagNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Страница не найдена';
  }, []);

  return (
    <main className='not-found'>
      <section className='not-found__content'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
        <button type='button' className='not-found__button' onClick={() => navigate(-1)}>
          Назад
        </button>
      </section>
    </main>
  );
}

export default PagNotFound;

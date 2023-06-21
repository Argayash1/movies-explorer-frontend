import { Route, Routes } from 'react-router-dom';
import '../Footer/Footer.css';

function Footer() {
  const paths = ['/', '/movies', '/saved-movies'];

  return (
    <footer className='footer'>
      <Routes>
        {paths.map((path) => (
          <Route
            path={path}
            key={Math.random()}
            element={
              <div className='footer__content'>
                <h4 className='footer__title'>Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h4>
                <div className='footer__container'>
                  <p className='footer__date'>&copy; {new Date().getFullYear()}</p>
                  <nav>
                    <ul className='footer__nav-list'>
                      <li>
                        <a
                          className='footer__nav-link'
                          href='https://practicum.yandex.ru/'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Яндекс.Практикум
                        </a>
                      </li>
                      <li>
                        <a
                          className='footer__nav-link'
                          href='https://github.com/Argayash1'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Github
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            }
          />
        ))}
      </Routes>
    </footer>
  );
}

export default Footer;

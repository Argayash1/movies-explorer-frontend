import '../Footer/Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__content'>
        <p className='footer__title'>Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
        <div className='footer__container'>
          <p className='footer__date'>&copy; {new Date().getFullYear()}</p>
          <nav>
            <ul className='footer__nav-list'>
              <li>
                <a className='footer__nav-link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>
                  Яндекс.Практикум
                </a>
              </li>
              <li>
                <a className='footer__nav-link' href='https://github.com/Argayash1' target='_blank' rel='noreferrer'>
                  Github
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

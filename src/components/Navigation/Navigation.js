import './Navigation.css';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <nav className='navigation'>
      {location.pathname === '/' && (
        <ul className='navigation__links'>
          <li>
            <Link to='/signup' className='navigation__link'>
              <button className='navigation__button'>Регистрация</button>
            </Link>
          </li>
          <li>
            <Link to='/signin' className='navigation__link navigation__link_type_login'>
              <button className='navigation__button navigation__button_type_login'>Войти</button>
            </Link>
          </li>
        </ul>
      )}
      {location.pathname === '/movies' && (
        <ul className='navigation__links navigation__links_type_movies'>
          <li>
            <NavLink
              to='/movies'
              className={({ isActive }) =>
                `navigation__link navigation__link_type_movies ${isActive ? 'navigation__link_active' : ''}`
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              to='/saved-movies'
              className={({ isActive }) =>
                `navigation__link navigation__link_type_saved-movies ${isActive ? 'navigation__link_active' : ''}`
              }
              // className='navigation__link navigation__link_type_saved-movies'
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile' className='navigation__link navigation__link_type_account'>
              <button className='navigation__button navigation__button_type_account'>Аккаунт</button>
            </NavLink>
          </li>
        </ul>
      )}
      {location.pathname === '/saved-movies' && (
        <ul className='navigation__links navigation__links_type_movies'>
          <li>
            <Link to='/movies' className='navigation__link navigation__link_type_movies'>
              Фильмы
            </Link>
            <NavLink
              to='/saved-movies'
              className={({ isActive }) =>
                `navigation__link navigation__link_type_saved-movies ${isActive ? 'navigation__link_active' : ''}`
              }
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li>
            <Link to='/profile' className='navigation__link navigation__link_type_account'>
              <button className='navigation__button navigation__button_type_account'>Аккаунт</button>
            </Link>
          </li>
        </ul>
      )}
      {location.pathname === '/profile' && (
        <ul className='navigation__links navigation__links_type_profile'>
          <li>
            <Link to='/movies' className='navigation__link navigation__link_type_movies'>
              Фильмы
            </Link>
            <Link to='/saved-movies' className='navigation__link navigation__link_type_saved-movies'>
              Сохранённые фильмы
            </Link>
          </li>
          <li>
            <Link to='/profile' className='navigation__link navigation__link_type_account'>
              <button className='navigation__button navigation__button_type_account'>Аккаунт</button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;

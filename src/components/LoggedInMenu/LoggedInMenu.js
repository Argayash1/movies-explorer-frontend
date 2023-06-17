import './LoggedInMenu.css';
import { Link, NavLink } from 'react-router-dom';

function LoggedInMenu({ type }) {
  const navLinkClassName = ({ isActive }) =>
    `logged-in-menu__link ${(type = 'main' && 'logged-in-menu__link_place_main')} 
  ${isActive ? 'logged-in-menu__link_active' : ''}`;

  return (
    <ul className={`logged-in-menu ${(type = 'movies' && 'logged-in-menu_place_movies')}`}>
      <li className={`logged-in-menu__item ${(type = 'movies' && 'logged-in-menu__item_place_movies')}`}>
        <NavLink to='/movies' className={navLinkClassName}>
          Фильмы
        </NavLink>
        <NavLink to='/saved-movies' className={navLinkClassName}>
          Сохранённые фильмы
        </NavLink>
      </li>
      <li className='logged-in-menu__item'>
        <Link to='/profile' className='logged-in-menu__link logged-in-menu__link_type_account'>
          <button className='logged-in-menu__button'>Аккаунт</button>
        </Link>
      </li>
    </ul>
  );
}

export default LoggedInMenu;

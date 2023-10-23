import AccountButton from '../AccountButton/AccountButton';
import './LoggedInMenu.css';
import { NavLink } from 'react-router-dom';

function LoggedInMenu({ place }) {
  const navLinkClassName = ({ isActive }) =>
    `logged-in-menu__link ${place === 'main' && 'logged-in-menu__link_place_main'} 
  ${isActive ? 'logged-in-menu__link_active' : ''}`;

  return (
    <div className={`logged-in-menu ${place === 'movies' ? 'logged-in-menu_place_movies' : ''}`}>
      <ul className={`logged-in-menu__list ${place === 'movies' && 'logged-in-menu__list_place_movies'}`}>
        <li>
          <NavLink to='/movies' className={navLinkClassName}>
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink to='/saved-movies' className={navLinkClassName}>
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <AccountButton />
    </div>
  );
}

export default LoggedInMenu;

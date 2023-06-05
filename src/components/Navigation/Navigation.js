import './Navigation.css';
import { Link, NavLink, useLocation, Routes, Route } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <nav className='nav-tab'>
      <ul className='nav-tab__nav-list'>
        <li>
          <NavLink to='/movies' className={({ isActive }) => `header__link ${isActive ? 'header__link_active' : ''}`}>
            Фильмы
          </NavLink>
          <NavLink to='/movies' className={({ isActive }) => `header__link ${isActive ? 'header__link_active' : ''}`}>
            Сохранённые фильмы
          </NavLink>
        </li>
        <li>
          <NavLink to='/movies' className={({ isActive }) => `header__link ${isActive ? 'header__link_active' : ''}`}>
            Аккаунт
          </NavLink>
        </li>
        <li>
          <Link to='/signup' className='nav-tab__link'>
            <button className='nav-tab__button'>Регистрация</button>
          </Link>
        </li>
        <li>
          <Link to='/signin' className='nav-tab__link'>
            <button className='nav-tab__button nav-tab__button_type_login'>Войти</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

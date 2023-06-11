import './BurgerMenu.css';
import { Link, NavLink } from 'react-router-dom';

function BurgerMenu({ isOpen, onBurgerMenuOpen, onBurgerMenuClose }) {
  return (
    <section className={`burger-menu ${isOpen && 'burger-menu_open'}`}>
      <nav className={`burger-menu__container ${isOpen && 'burger-menu__container_open'}`}>
        <button className='burger-menu__close-button' onClick={onBurgerMenuClose}></button>
        <ul className='burger-menu__nav-list'>
          <li className='burger-menu__nav-list-item'>
            <NavLink
              to='/'
              className={({ isActive }) => `burger-menu__nav-link ${isActive && 'burger-menu__nav-link_active'}`}
            >
              Главная
            </NavLink>
          </li>
          <li className='burger-menu__nav-list-item'>
            <NavLink
              to='/movies'
              className={({ isActive }) => `burger-menu__nav-link ${isActive && 'burger-menu__nav-link_active'}`}
            >
              Фильмы
            </NavLink>
          </li>
          <li className='burger-menu__nav-list-item'>
            <NavLink
              to='/saved-movies'
              className={({ isActive }) => `burger-menu__nav-link ${isActive && 'burger-menu__nav-link_active'}`}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link to='/profile' className='burger-menu__account-link'>
          <button className='burger-menu__account-button'>Аккаунт</button>
        </Link>
      </nav>
    </section>
  );
}

export default BurgerMenu;

import AccountButton from '../AccountButton/AccountButton';
import Popup from '../Popup/Popup';
import './BurgerMenu.css';
import { NavLink } from 'react-router-dom';

function BurgerMenu({ isOpen, onBurgerMenuOpen, onBurgerMenuClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onBurgerMenuClose}>
      <nav className={`burger-menu ${isOpen && 'burger-menu_open'}`}>
        <button className='burger-menu__close-button' onClick={onBurgerMenuClose}></button>
        <ul className='burger-menu__nav'>
          <li>
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
          </li>
          <li>
            <AccountButton />
          </li>
        </ul>
      </nav>
    </Popup>
  );
}

export default BurgerMenu;

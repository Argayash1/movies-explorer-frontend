import AccountButton from '../AccountButton/AccountButton';
import Popup from '../Popup/Popup';
import './BurgerMenu.css';
import { NavLink } from 'react-router-dom';

function BurgerMenu({ isOpen, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <nav className={`burger-menu ${isOpen ? 'burger-menu_is_opened' : ''}`}>
        <button className='burger-menu__close-button' onClick={onClose}></button>
        <ul className='burger-menu__nav-list'>
          <li className='burger-menu__nav-list-item'>
            <ul className='burger-menu__nav-links'>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `burger-menu__nav-link ${isActive ? 'burger-menu__nav-link_active' : ''}`
                  }
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/movies'
                  className={({ isActive }) =>
                    `burger-menu__nav-link ${isActive ? 'burger-menu__nav-link_active' : ''}`
                  }
                >
                  Фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/saved-movies'
                  className={({ isActive }) =>
                    `burger-menu__nav-link ${isActive ? 'burger-menu__nav-link_active' : ''}`
                  }
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
          </li>
          <li className='burger-menu__nav-list-item'>
            <AccountButton />
          </li>
        </ul>
      </nav>
    </Popup>
  );
}

export default BurgerMenu;

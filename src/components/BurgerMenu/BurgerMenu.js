import Popup from '../Popup/Popup';
import AccountButton from '../AccountButton/AccountButton';
import BurgerCloseButton from '../BurgerCloseButton/BurgerCloseButton';
import './BurgerMenu.css';
import { NavLink } from 'react-router-dom';

function BurgerMenu({ isOpen, onClose, onNavigateToProfile }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <nav className={`burger-menu ${isOpen ? 'burger-menu_is_opened' : ''}`}>
        <BurgerCloseButton onClose={onClose} />
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
            <AccountButton onNavigateToProfile={onNavigateToProfile} />
          </li>
        </ul>
      </nav>
    </Popup>
  );
}

export default BurgerMenu;

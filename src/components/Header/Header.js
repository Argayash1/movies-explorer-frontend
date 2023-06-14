import Navigation from '../Navigation/Navigation';
import header_logo from '../../images/header_logo.svg';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ isBurgerMenuOpen, onBurgerMenuOpen }) {
  const location = useLocation();
  return (
    <header className='header'>
      {location.pathname === '/' && (
        <div className='header__content'>
          <Link to='/'>
            <img className='header__logo' src={header_logo} alt='Логотип проекта' />
          </Link>
          <Navigation isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuOpen={onBurgerMenuOpen} />
        </div>
      )}
      {location.pathname === '/movies' && (
        <div className='header__content'>
          <Link to='/'>
            <img className='header__logo' src={header_logo} alt='Логотип проекта' />
          </Link>
          <Navigation isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuOpen={onBurgerMenuOpen} />
        </div>
      )}
      {location.pathname === '/saved-movies' && (
        <div className='header__content'>
          <Link to='/'>
            <img className='header__logo' src={header_logo} alt='Логотип проекта' />
          </Link>
          <Navigation isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuOpen={onBurgerMenuOpen} />
        </div>
      )}
      {location.pathname === '/profile' && (
        <div className='header__content header__content_type_profile'>
          <Link to='/'>
            <img className='header__logo' src={header_logo} alt='Логотип проекта' />
          </Link>
          <Navigation isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuOpen={onBurgerMenuOpen} />
        </div>
      )}
    </header>
  );
}
export default Header;

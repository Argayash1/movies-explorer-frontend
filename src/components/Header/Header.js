import Logo from '../Logo/Logo';
import { Route, Routes, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import BurgerMenuButton from '../BurgerMenuButton/BurgerMenuButton';

function Header({ isLoggedIn, isBurgerMenuOpen, onBurgerMenuOpen, onBurgerMenuClose }) {
  const { pathname } = useLocation();
  const mainPath = pathname === '/';

  return (
    <header className='header'>
      <Routes>
        {['/', '/movies', 'saved-movies', '/profile'].map((path) => (
          <Route
            path={path}
            element={
              <div
                className={`header__content ${mainPath && 'header__content_place_main'} ${
                  pathname === '/movies' && 'header__content_place_movies'
                }`}
              >
                <Logo />
                <Navigation isLoggedIn={isLoggedIn} />
                <BurgerMenuButton isLoggedIn={isLoggedIn} onBurgerMenuOpen={onBurgerMenuOpen} />
                <BurgerMenu
                  isOpen={isBurgerMenuOpen}
                  onBurgerMenuOpen={onBurgerMenuOpen}
                  onBurgerMenuClose={onBurgerMenuClose}
                />
              </div>
            }
          />
        ))}
      </Routes>
    </header>
  );
}

export default Header;

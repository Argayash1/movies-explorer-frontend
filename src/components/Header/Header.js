import Logo from '../Logo/Logo';
import { Route, Routes, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import BurgerMenuButton from '../BurgerMenuButton/BurgerMenuButton';

function Header({ isLoggedIn, isBurgerMenuOpen, onBurgerMenuOpen, onBurgerMenuClose }) {
  const { pathname } = useLocation();
  const paths = ['/', '/movies', '/saved-movies', '/profile'];
  const pathMain = pathname === '/';
  const pathMovies = pathname === '/movies';

  return (
    <header className='header'>
      <Routes>
        {paths.map((path) => (
          <Route
            path={path}
            element={
              <div
                className={`header__content ${pathMain && 'header__content_place_main'} 
                ${pathMovies && 'header__content_place_movies'}`}
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

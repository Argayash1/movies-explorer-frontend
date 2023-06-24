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
  const pathsWithMoviesAndProfile = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile';
  const headerContentClassName = `header__content ${isLoggedIn ? 'header__content_user_logged-in' : ''}    
  ${pathMain ? 'header__content_place_main' : ''} 
  ${pathsWithMoviesAndProfile ? 'header__content_place_movies' : ''}`;

  return (
    <header className='header'>
      <Routes>
        {paths.map((path) => (
          <Route
            path={path}
            key={Math.random()}
            element={
              <div className={headerContentClassName}>
                <Logo />
                <Navigation isLoggedIn={isLoggedIn} />
                <BurgerMenuButton isLoggedIn={isLoggedIn} onBurgerMenuOpen={onBurgerMenuOpen} />
                <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} />
              </div>
            }
          />
        ))}
      </Routes>
    </header>
  );
}

export default Header;

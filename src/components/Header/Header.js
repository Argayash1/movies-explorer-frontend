import Logo from '../Logo/Logo';
import { useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import BurgerMenuButton from '../BurgerMenuButton/BurgerMenuButton';

function Header({
  isLoggedIn,
  isBurgerMenuOpen,
  onBurgerMenuOpen,
  onBurgerMenuClose,
  onNavigateToSignup,
  onNavigateToSignin,
  onNavigateToProfile,
}) {
  const { pathname } = useLocation();
  const pathMain = pathname === '/';
  const pathsWithMoviesAndProfile = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile';
  const headerContentClassName = `header__content ${isLoggedIn ? 'header__content_user_logged-in' : ''}    
  ${pathMain ? 'header__content_place_main' : ''} 
  ${pathsWithMoviesAndProfile ? 'header__content_place_movies' : ''}`;

  return (
    <header className='header'>
      <div className={headerContentClassName}>
        <Logo />
        <Navigation
          isLoggedIn={isLoggedIn}
          onNavigateToSignup={onNavigateToSignup}
          onNavigateToSignin={onNavigateToSignin}
          onNavigateToProfile={onNavigateToProfile}
        />
        <BurgerMenuButton isLoggedIn={isLoggedIn} onBurgerMenuOpen={onBurgerMenuOpen} />
        <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} onNavigateToProfile={onNavigateToProfile} />
      </div>
    </header>
  );
}

export default Header;

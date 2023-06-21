import LoggedInMenu from '../LoggedInMenu/LoggedInMenu';
import MainMenu from '../MainMenu/MainMenu';
import './Navigation.css';
import { useLocation } from 'react-router-dom';

function Navigation({ isLoggedIn }) {
  const { pathname } = useLocation();
  const otherPaths = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile';
  const mainPath = pathname === '/';

  return (
    <nav className={`navigation ${otherPaths && 'navigation_place_movies'}`}>
      {mainPath && (
        <ul className='navigation__links'>
          <li>{isLoggedIn && <LoggedInMenu place='main' />}</li>
          <li>{!isLoggedIn && <MainMenu />}</li>
        </ul>
      )}
      {otherPaths && <LoggedInMenu place='movies' />}
    </nav>
  );
}

export default Navigation;

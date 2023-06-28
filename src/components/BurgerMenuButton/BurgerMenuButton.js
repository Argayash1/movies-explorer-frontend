import './BurgerMenuButton.css';
import { useLocation } from 'react-router-dom';

function BurgerMenuButton({ onBurgerMenuOpen, isLoggedIn }) {
  const { pathname } = useLocation();
  const mainPath = pathname === '/';

  return (
    <button
      className={`burger-menu-button ${mainPath && !isLoggedIn && 'burger-menu-button_is_hidden'}`}
      onClick={onBurgerMenuOpen}
      type='button'
    ></button>
  );
}

export default BurgerMenuButton;

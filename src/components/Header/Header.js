import Navigation from '../Navigation/Navigation';
import header_logo from '../../images/header_logo.svg';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__logo' src={header_logo} alt='Логотип' />
      </Link>
      <Navigation />
    </header>
  );
}
export default Header;

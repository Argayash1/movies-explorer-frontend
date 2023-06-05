import Navigation from '../Navigation/Navigation';
import header_logo from '../../images/header_logo.svg';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__logo' src={header_logo} alt='Логотип' />
      </Link>
      <NavLink to='/movies' className={({ isActive }) => `header__link ${isActive ? 'header__link_active' : ''}`}>
        Домой
      </NavLink>
    </header>
  );
}
export default Header;

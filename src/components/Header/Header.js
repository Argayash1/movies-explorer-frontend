import Navigation from '../Navigation/Navigation';
import header_logo from '../../images/header_logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__logo' src={header_logo} alt='Логотип' />
      </Link>
      <Routes>
        <Route path='/' element={<p>Яша хам</p>}></Route>
        <Route path='/movies' element={<p>Яша козёл</p>}></Route>
      </Routes>
    </header>
  );
}
export default Header;

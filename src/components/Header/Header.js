import NavTab from '../NavTab/NavTab';
import header_logo from '../../images/header_logo.svg';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={header_logo} alt='Логотип' />
      <NavTab />
    </header>
  );
}
export default Header;

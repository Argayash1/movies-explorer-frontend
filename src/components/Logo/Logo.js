import './Logo.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to='/'>
      <img className='logo' src={logo} alt='Логотип проекта Movies-explorer' />
    </Link>
  );
}

export default Logo;

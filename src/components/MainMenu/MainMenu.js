import './MainMenu.css';
import { Link } from 'react-router-dom';

function MainMenu() {
  return (
    <ul className='menu'>
      <li>
        <Link to='/signup' className='menu__link'>
          Регистрация
        </Link>
      </li>
      <li>
        <Link to='/signin' className='menu__link menu__link_type_login'>
          Войти
        </Link>
      </li>
    </ul>
  );
}

export default MainMenu;

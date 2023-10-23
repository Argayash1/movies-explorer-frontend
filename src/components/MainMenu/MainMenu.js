import { useNavigate } from 'react-router-dom';
import './MainMenu.css';

function MainMenu() {
  const navigate = useNavigate();

  function handleNavigateToSignup() {
    navigate('/signup');
  }

  function handleNavigateToSignin() {
    navigate('/signin');
  }

  return (
    <ul className='menu'>
      <li>
        <button className='menu__button' type='button' onClick={handleNavigateToSignup}>
          Регистрация
        </button>
      </li>
      <li>
        <button className='menu__button menu__button_type_login' type='button' onClick={handleNavigateToSignin}>
          Войти
        </button>
      </li>
    </ul>
  );
}

export default MainMenu;

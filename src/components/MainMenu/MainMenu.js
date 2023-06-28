import './MainMenu.css';

function MainMenu({ onNavigateToSignup, onNavigateToSignin }) {
  return (
    <ul className='menu'>
      <li>
        <button className='menu__button' type='button' onClick={onNavigateToSignup}>
          Регистрация
        </button>
      </li>
      <li>
        <button className='menu__button menu__button_type_login' type='button' onClick={onNavigateToSignin}>
          Войти
        </button>
      </li>
    </ul>
  );
}

export default MainMenu;

import '../NavTab/NavTab.css';

function NavTab() {
  return (
    <nav className='nav-tab'>
      <ul className='nav-tab__nav-list'>
        <li>
          <button className='nav-tab__button'>Регистрация</button>
        </li>
        <li>
          <button className='nav-tab__button nav-tab__button_type_login'>Войти</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;

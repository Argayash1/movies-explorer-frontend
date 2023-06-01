import '../NavTab/NavTab.css'

function NavTab() {
    return (
      <div className="nav-tab">
      <button className='nav-tab__button'>Регистрация</button>
      <button className='nav-tab__button nav-tab__button_type_login'>Войти</button>
      </div>
    );
  }
  
  export default NavTab;
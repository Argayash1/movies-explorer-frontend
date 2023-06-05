import './Navigation.css';
import { Link, useLocation, Routes, Route } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <nav className='nav-tab'>
      <Routes>
        <Route path='/' element={<p> Ляляля </p>}></Route>
        <Route path='/movies' element={<p> Пампампампампам</p>}></Route>
      </Routes>
      {/* {location.pathname === '/' && (
        <ul className='nav-tab__nav-list'>
          <li>
            <Link to='/signup' className='nav-tab__link'>
              <button className='nav-tab__button'>Регистрация</button>
            </Link>
          </li>
          <li>
            <Link to='/signin' className='nav-tab__link'>
              <button className='nav-tab__button nav-tab__button_type_login'>Войти</button>
            </Link>
          </li>
        </ul>
      )}

      {location.pathname === '/movies' && (
        <ul className='nav-tab__nav-list'>
          <li>
            <Link to='/signup' className='nav-tab__link'>
              <button className='nav-tab__button'>Регfgflg,flg,l</button>
            </Link>
          </li>
          <li>
            <Link to='/signin' className='nav-tab__link'>
              <button className='nav-tab__button nav-tab__button_type_login'>dsfsdfsdfsd</button>
            </Link>
          </li>
        </ul>
      )} */}
    </nav>
  );
}

export default Navigation;

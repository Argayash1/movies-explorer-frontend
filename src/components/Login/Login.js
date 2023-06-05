import './Login.css';
import login_logo from '../../images/header_logo.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='login'>
      <div className='login__conyainer'>
        <Link to='/'>
          <img className='login__logo' src={login_logo} alt='Логотип' />
        </Link>
        <h2 className='login__title'>Рады видеть!</h2>
      </div>
      <form className='login__form' noValidate>
        <label for='email' className='login__input-label'>
          E-mail
        </label>
        <input
          type='email'
          className='login__input'
          name='email'
          id='email'
          placeholder='E-mail'
          autoComplete='off'
          required
        />
        <span className='login__error'></span>

        <label for='password' className='login__input-label'>
          Пароль
        </label>
        <input
          type='password'
          className='login__input'
          name='password'
          id='password'
          placeholder='Пароль'
          autoComplete='off'
          required
        />
        <span className='login__error'></span>
        <button className='login__submit-button' type='submit'>
          Войти
        </button>
      </form>
      <div className='login__signin'>
        <p className='login__signin-text'>Ещё не зарегистрированы?</p>
        <Link to='/signup' className='login__signin-link'>
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Login;

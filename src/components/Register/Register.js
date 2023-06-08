import './Register.css';
import register_logo from '../../images/header_logo.svg';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='register'>
      <div className='register__conyainer'>
        <Link to='/'>
          <img className='register__logo' src={register_logo} alt='Логотип' />
        </Link>
        <h2 className='register__title'>Добро пожаловать!</h2>
      </div>
      <form className='register__form' noValidate>
        <label for='name' className='register__input-label'>
          Имя
        </label>
        <input
          type='text'
          className='register__input'
          name='name'
          id='name'
          placeholder='Имя'
          autoComplete='off'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='register__error'></span>
        <label for='email' className='register__input-label'>
          E-mail
        </label>
        <input
          type='email'
          className='register__input'
          name='email'
          id='email'
          placeholder='E-mail'
          autoComplete='off'
          required
        />
        <span className='register__error'></span>
        <label for='password' className='register__input-label'>
          Пароль
        </label>
        <input
          type='password'
          className='register__input'
          name='password'
          id='password'
          placeholder='Пароль'
          autoComplete='off'
          required
        />
        <span className='register__error'></span>
        <button className='register__submit-button' type='submit'>
          Зарегистрироваться
        </button>
      </form>
      <div className='register__signin'>
        <p className='register__signin-text'>Уже зарегистрированы?</p>
        <Link to='/signin' className='register__signin-link'>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;

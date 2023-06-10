import './Register.css';
import AuthPage from '../AuthPage/AuthPage';

const Register = () => {
  return (
    <AuthPage
      headerText='Добро пожаловать'
      buttonText='Зарегистрироваться'
      paragraphText='Уже'
      url='/signin'
      linkText='Войти'
    >
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
    </AuthPage>
  );
};

export default Register;

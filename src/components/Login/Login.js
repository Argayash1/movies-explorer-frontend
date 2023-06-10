import './Login.css';
import AuthPage from '../AuthPage/AuthPage';

const Login = () => {
  return (
    <AuthPage
      headerText='Рады видеть'
      buttonText='Войти'
      paragraphText='Ещё не'
      url='/signup'
      linkText='Зарегистрироваться'
    >
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
        minLength='2'
        maxLength='30'
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
    </AuthPage>
  );
};

export default Login;

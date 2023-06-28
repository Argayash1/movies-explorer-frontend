import './Login.css';
import AuthPage from '../AuthPage/AuthPage';

const Login = ({ onSubmit, isFormValid }) => {
  return (
    <main className='login'>
      <AuthPage
        headerText='Рады видеть!'
        buttonText='Войти'
        paragraphText='Ещё не'
        url='/signup'
        linkText='Регистрация'
        name='login'
        onSubmit={onSubmit}
        isFormValid={isFormValid}
      >
        <label htmlFor='email' className='login__input-label'>
          E-mail
        </label>
        <input
          type='email'
          className='login__input'
          name='email'
          id='email'
          placeholder='E-mail'
          autoComplete='off'
          defaultValue='pochta@yandex.ru'
          required
        />
        <span className='login__error'></span>

        <label htmlFor='password' className='login__input-label'>
          Пароль
        </label>
        <input
          type='password'
          className='login__input'
          name='password'
          id='password'
          placeholder='Пароль'
          minLength='6'
          maxLength='30'
          autoComplete='off'
          required
        />
        <span className='login__error'></span>
      </AuthPage>
    </main>
  );
};

export default Login;

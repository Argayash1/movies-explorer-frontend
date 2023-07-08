import './Login.css';
import useForm from '../../hooks/useForm';
import AuthPage from '../AuthPage/AuthPage';

const Login = ({ name, onSignin, isRequestSuccessful, errorText, onCleanErrorText, isLoading }) => {
  const { values, errors, formValid, onChange } = useForm();
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  return (
    <main className='login'>
      <AuthPage
        headerText='Рады видеть!'
        buttonText='Войти'
        paragraphText='Ещё не'
        url='/signup'
        linkText='Регистрация'
        name={`${name}`}
        onSubmit={onSignin}
        isLoading={isLoading}
        loadingText='Вход...'
        values={values}
        formValid={formValid}
        isRequestSuccessful={isRequestSuccessful}
        errorText={errorText}
        onCleanErrorText={onCleanErrorText}
      >
        <label htmlFor='email' className='login__input-label'>
          E-mail
        </label>
        <input
          type='text'
          className={`login__input ${errors.email && 'login__input_type_error'}`}
          value={values.email || ''}
          name='email'
          id='email'
          onChange={onChange}
          placeholder='E-mail'
          autoComplete='off'
          pattern={EMAIL_REGEXP}
          disabled={isLoading}
          required
        />
        <span className='login__error'>{errors.email}</span>

        <label htmlFor='password' className='login__input-label'>
          Пароль
        </label>
        <input
          type='password'
          className={`login__input ${errors.password && 'login__input_type_error'}`}
          value={values.password || ''}
          name='password'
          id='password'
          onChange={onChange}
          placeholder='Пароль'
          minLength='8'
          maxLength='30'
          autoComplete='off'
          required
        />
        <span className='login__error login__error_type_lower'>{errors.password}</span>
      </AuthPage>
    </main>
  );
};

export default Login;

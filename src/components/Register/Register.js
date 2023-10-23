import './Register.css';
import useForm from '../../hooks/useForm';
import AuthPage from '../AuthPage/AuthPage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { nameRegex } from '../../utils/configs/regexConfig';

const Register = ({ name, onSignup, isRequestSuccessful, errorText, onCleanErrorText, isLoading, isLoggedIn }) => {
  const { values, errors, formValid, onChange } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate('/movies', { replace: true });
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    document.title = 'Регистрация';
  }, []);

  return (
    <main className='register'>
      <AuthPage
        headerText='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        paragraphText='Уже'
        url='/signin'
        linkText='Войти'
        name={`${name}`}
        onSubmit={onSignup}
        isLoading={isLoading}
        loadingText='Регистрация...'
        values={values}
        formValid={formValid}
        isRequestSuccessful={isRequestSuccessful}
        errorText={errorText}
        onCleanErrorText={onCleanErrorText}
      >
        <label htmlFor='name' className='register__input-label'>
          Имя
        </label>
        <input
          className={`register__input ${errors.name && 'register__input_type_error'}`}
          type='text'
          value={values.name || ''}
          onChange={onChange}
          name='name'
          id='name'
          form='form'
          placeholder='Имя'
          minLength='2'
          maxLength='30'
          autoComplete='off'
          pattern={nameRegex}
          disabled={isLoading}
          required
        />
        <span className='register__error'>{errors.name}</span>
        <label htmlFor='email' className='register__input-label'>
          E-mail
        </label>
        <input
          type='email'
          className={`register__input ${errors.email && 'register__input_type_error'}`}
          value={values.email || ''}
          onChange={onChange}
          name='email'
          id='email'
          form='form'
          placeholder='E-mail'
          autoComplete='off'
          disabled={isLoading}
          required
        />
        <span className='register__error'>{errors.email}</span>
        <label htmlFor='password' className='register__input-label'>
          Пароль
        </label>
        <input
          type='password'
          value={values.password || ''}
          onChange={onChange}
          className={`register__input ${errors.password && 'register__input_type_error'}`}
          name='password'
          id='password'
          form='form'
          placeholder='Пароль'
          minLength='6'
          maxLength='30'
          autoComplete='off'
          minLength='8'
          maxLength='30'
          disabled={isLoading}
          required
        />
        <span className='register__error register__error_type-lower'>{errors.password}</span>
      </AuthPage>
    </main>
  );
};

export default Register;

import './Register.css';
import AuthPage from '../AuthPage/AuthPage';

const Register = ({ onSubmit }) => {
  return (
    <AuthPage
      headerText='Добро пожаловать'
      buttonText='Зарегистрироваться'
      paragraphText='Уже'
      url='/signin'
      linkText='Войти'
      onSubmit={onSubmit}
    >
      <label htmlFor='name' className='register__input-label'>
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
        defaultValue='Виталий'
        required
      />
      <span className='register__error'></span>
      <label htmlFor='email' className='register__input-label'>
        E-mail
      </label>
      <input
        type='email'
        className='register__input'
        name='email'
        id='email'
        placeholder='E-mail'
        autoComplete='off'
        defaultValue='pochta@yandex.ru'
        required
      />
      <span className='register__error'></span>
      <label htmlFor='password' className='register__input-label'>
        Пароль
      </label>
      <input
        type='password'
        className='register__input register__input_is_not-valid'
        name='password'
        id='password'
        placeholder='Пароль'
        autoComplete='off'
        defaultValue='12345678'
        required
      />
      <span className='register__error'>Что-то пошло не так...</span>
    </AuthPage>
  );
};

export default Register;

import { Link } from 'react-router-dom';
import './AuthPage.css';
import Logo from '../Logo/Logo';

function AuthPage({ headerText, buttonText, paragraphText, url, linkText, children }) {
  return (
    <main className='authpage'>
      <div className='authpage__container'>
        <Logo />
        <h2 className='authpage__title'>{headerText}</h2>
      </div>
      <form className='authpage__form'>
        {children}
        <button className='authpage__submit-button' type='submit'>
          {buttonText}
        </button>
      </form>
      <div className='authpage__signin'>
        <p className='authpage__signin-text'>{`${paragraphText} зарегистрированы?`}</p>
        <Link to={url} className='authpage__signin-link'>
          {linkText}
        </Link>
      </div>
    </main>
  );
}

export default AuthPage;

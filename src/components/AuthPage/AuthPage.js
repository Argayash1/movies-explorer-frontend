import { Link } from 'react-router-dom';
import authpage_logo from '../../images/header_logo.svg';
import './AuthPage.css';

function AuthPage({ headerText, buttonText, paragraphText, url, linkText, children }) {
  return (
    <div className='authpage'>
      <div className='authpage__container'>
        <Link to='/'>
          <img className='authpage__logo' src={authpage_logo} alt='Логотип' />
        </Link>
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
    </div>
  );
}

export default AuthPage;

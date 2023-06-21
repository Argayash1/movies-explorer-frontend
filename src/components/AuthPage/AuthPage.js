import { Link } from 'react-router-dom';
import './AuthPage.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import AuthTitle from '../AuthTitle/AuthTitle';

function AuthPage({ headerText, buttonText, paragraphText, url, linkText, onSubmit, children }) {
  return (
    <main className='authpage'>
      <div className='authpage__container'>
        <Logo />
        <AuthTitle headerText={headerText} />
      </div>
      <Form buttonText={buttonText} type='auth' name='auth' onSubmit={onSubmit}>
        {children}
      </Form>
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

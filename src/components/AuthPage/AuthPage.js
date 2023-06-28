import { Link } from 'react-router-dom';
import './AuthPage.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import AuthTitle from '../AuthTitle/AuthTitle';

function AuthPage({
  headerText,
  buttonText,
  paragraphText,
  url,
  linkText,
  name,
  onSubmit,
  isLoading,
  loadingText,
  values,
  formValid,
  children,
}) {
  return (
    <section className='authpage'>
      <Logo />
      <AuthTitle headerText={headerText} />
      <Form
        buttonText={buttonText}
        type={name}
        name={`${name}`}
        onSubmit={onSubmit}
        isLoading={isLoading}
        loadingText={loadingText}
        values={values}
        formValid={formValid}
      >
        {children}
      </Form>
      <div className='authpage__container'>
        <p className='authpage__text'>{`${paragraphText} зарегистрированы?`}</p>
        <Link to={url} className='authpage__link'>
          {linkText}
        </Link>
      </div>
    </section>
  );
}

export default AuthPage;

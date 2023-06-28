import './AuthTitle.css';

function AuthTitle({ headerText, place }) {
  return <h1 className={`auth-title ${place === 'profile' && 'auth-title_place_profile'}`}>{headerText}</h1>;
}

export default AuthTitle;

import './AuthTitle.css';

function AuthTitle({ headerText, place }) {
  return <h2 className={`auth-title ${place === 'profile' && 'auth-title_place_profile'}`}>{headerText}</h2>;
}

export default AuthTitle;

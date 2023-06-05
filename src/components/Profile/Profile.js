import './Profile.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <section className='profile'>
      <Header />
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <div className='profile__links'>
        <Link to='/main' className='profile__link'>
          Редактировать
        </Link>
        <Link to='/main' className='profile__link profile__link_type_logout'>
          Выйти
        </Link>
      </div>
    </section>
  );
}

export default Profile;

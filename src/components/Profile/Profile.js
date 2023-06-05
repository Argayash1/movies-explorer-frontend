import './Profile.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <section className='profile'>
      <Header />
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <ul className='profile__data'>
        <li className='profile__data-item profile__data-item_type_upper'>Имя</li>
        <li className='profile__data-item profile__data-item_type_upper'>Виталий</li>
        <li className='profile__data-item'>E-mail</li>
        <li className='profile__data-item'>pochta@yandex.ru</li>
      </ul>
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
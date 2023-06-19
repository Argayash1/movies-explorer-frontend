import { useState } from 'react';
import './Profile.css';
import Form from '../Form/Form';
import AuthTitle from '../AuthTitle/AuthTitle';

function Profile({ isBurgerMenuOpen, onBurgerMenuOpen, user }) {
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  function handleEditProfile() {
    setIsProfileEdit(true);
  }

  function hadleProfileSubmit() {
    setIsProfileEdit(false);
  }

  return (
    <main className='profile'>
      <AuthTitle headerText={`Привет, ${user.name}`} place='profile' />
      <Form type='profile' buttonText='Сохранить' isProfileEdit={isProfileEdit} onSubmit={hadleProfileSubmit}>
        <label htmlFor='' className='profile__input-label'>
          Имя
          <input
            className='profile__input'
            type='text'
            name='name'
            id='name'
            placeholder='Имя'
            autoComplete='off'
            minLength='2'
            maxLength='30'
            required
            disabled={!isProfileEdit && true}
          />
          <span className='profile__error'>a</span>
        </label>
        <label htmlFor='' className='profile__input-label'>
          E-mail
          <input
            className='profile__input profile__input_type_e-mail'
            type='email'
            name='email'
            id='email'
            placeholder='E-mail'
            autoComplete='off'
            required
            disabled={!isProfileEdit && true}
          />
          <span className='profile__error'>a</span>
        </label>
      </Form>
      {!isProfileEdit && (
        <div className='profile__buttons'>
          <button className='profile__button' onClick={handleEditProfile}>
            Редактировать
          </button>
          <button className='profile__button profile__button_type_logout'>Выйти</button>
        </div>
      )}
    </main>
  );
}

export default Profile;

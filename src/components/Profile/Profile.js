import { useContext } from 'react';
import useForm from '../../hooks/useForm';
import './Profile.css';
import Form from '../Form/Form';
import AuthTitle from '../AuthTitle/AuthTitle';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile({ isEdit, onSignOut, onSubmit, onEditProfile, isFormValid }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, formValid, onChange } = useForm();

  return (
    <main className='profile'>
      <section className='profile__content'>
        <AuthTitle headerText={`Привет, ${currentUser.name}!`} place='profile' />
        <Form
          type='profile'
          name='profile'
          buttonText='Сохранить'
          isProfileEdit={isEdit}
          onSubmit={onSubmit}
          values={values}
          formValid={formValid}
        >
          <label htmlFor='name' className='profile__input-label'>
            Имя
          </label>
          <input
            className={`profile__input ${errors.name && 'profile__input_type_error'}`}
            value={values.name || currentUser.name}
            onChange={onChange}
            type='text'
            name='name'
            id='name'
            placeholder='Имя'
            autoComplete='off'
            minLength='2'
            maxLength='30'
            required
            disabled={!isEdit && true}
          />
          <label htmlFor='email' className='profile__input-label profile__input-label_type_e-mail'>
            E-mail
          </label>
          <input
            className={`profile__input profile__input_type_e-mail ${errors.email && 'profile__input_type_error'}`}
            value={values.email || currentUser.email}
            onChange={onChange}
            type='email'
            name='email'
            id='email'
            placeholder='E-mail'
            autoComplete='off'
            required
            disabled={!isEdit && true}
          />

          {isEdit && !isFormValid && <span className='profile__error'>При обновлении профиля произошла ошибка.</span>}
        </Form>
        {!isEdit && (
          <div className='profile__buttons'>
            <button className='profile__button' type='button' onClick={onEditProfile}>
              Редактировать
            </button>
            <button className='profile__button profile__button_type_logout' type='button' onClick={onSignOut}>
              Выйти из аккаунта
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;

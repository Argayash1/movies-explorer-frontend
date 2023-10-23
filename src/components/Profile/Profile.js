import { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import './Profile.css';
import Form from '../Form/Form';
import AuthTitle from '../AuthTitle/AuthTitle';
import { nameRegex } from '../../utils/configs/regexConfig';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile({ isEdit, onSignOut, onSubmit, onEditProfile, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, formValid, onChange, resetValidation } = useForm();
  const [isOtherUserData, setIsOtherUserData] = useState(false);

  useEffect(() => {
    document.title = 'Аккаунт';
  }, []);

  useEffect(() => {
    resetValidation({ name: currentUser.name, email: currentUser.email }, {}, false);
  }, [currentUser, resetValidation]);

  useEffect(() => {
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setIsOtherUserData(true);
    } else {
      setIsOtherUserData(false);
    }
  }, [values.name, values.email, currentUser.name, currentUser.email]);

  return (
    <main className='profile'>
      <section className='profile__content'>
        <AuthTitle headerText={`Привет, ${currentUser.name}!`} place='profile' />
        <Form
          type='profile'
          name='profile'
          buttonText='Сохранить'
          loadingText='Сохранение...'
          isProfileEdit={isEdit}
          isLoading={isLoading}
          onSubmit={onSubmit}
          values={values}
          formValid={formValid}
          isOtherUserData={isOtherUserData}
        >
          <fieldset className='profile__inputs-container'>
            <label htmlFor='name' className='profile__input-label'>
              Имя
            </label>
            <input
              className={`profile__input ${errors.name && 'profile__input_type_error'}`}
              value={values.name || ''}
              onChange={onChange}
              type='text'
              name='name'
              id='name'
              placeholder='Имя'
              minLength='2'
              maxLength='30'
              autoComplete='off'
              pattern={nameRegex}
              required
              disabled={!isEdit || isLoading}
            />
            <label htmlFor='email' className='profile__input-label profile__input-label_type_e-mail'>
              E-mail
            </label>
            <input
              className={`profile__input profile__input_type_e-mail ${errors.email && 'profile__input_type_error'}`}
              value={values.email || ''}
              onChange={onChange}
              type='email'
              name='email'
              id='email'
              placeholder='E-mail'
              autoComplete='off'
              required
              disabled={!isEdit || isLoading}
            />
          </fieldset>
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

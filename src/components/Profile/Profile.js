import './Profile.css';
import Form from '../Form/Form';
import AuthTitle from '../AuthTitle/AuthTitle';

function Profile({ user, isEdit, onSignOut, onSubmit, onEditProfile, isFormValid }) {
  return (
    <main className='profile'>
      <AuthTitle headerText={`Привет, ${user.name}`} place='profile' />
      <Form
        type='profile'
        name='profile'
        buttonText='Сохранить'
        isProfileEdit={isEdit}
        onSubmit={onSubmit}
        isFormValid={isFormValid}
      >
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
            disabled={!isEdit && true}
          />
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
            disabled={!isEdit && true}
          />
        </label>
        {isEdit && !isFormValid && <span className='profile__error'>При обновлении профиля произошла ошибка.</span>}
      </Form>
      {!isEdit && (
        <div className='profile__buttons'>
          <button className='profile__button' onClick={onEditProfile}>
            Редактировать
          </button>
          <button className='profile__button profile__button_type_logout' onClick={onSignOut}>
            Выйти
          </button>
        </div>
      )}
    </main>
  );
}

export default Profile;

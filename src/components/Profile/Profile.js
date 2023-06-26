import './Profile.css';
import Form from '../Form/Form';
import AuthTitle from '../AuthTitle/AuthTitle';

function Profile({ user, isEdit, onSignOut, onSubmit, onEditProfile, isFormValid }) {
  return (
    <main className='profile'>
      <section className='profile__content'>
        <AuthTitle headerText={`Привет, ${user.name}!`} place='profile' />
        <Form
          type='profile'
          name='profile'
          buttonText='Сохранить'
          isProfileEdit={isEdit}
          onSubmit={onSubmit}
          isFormValid={isFormValid}
        >
          <label htmlFor='name' className='profile__input-label'>
            Имя
          </label>
          <input
            className='profile__input'
            type='text'
            name='name'
            id='name'
            placeholder='Имя'
            autoComplete='off'
            minLength='2'
            maxLength='30'
            defaultValue={user.name}
            required
            disabled={!isEdit && true}
          />
          <label htmlFor='' className='profile__input-label profile__label_type_e-mail'>
            E-mail
          </label>
          <input
            className='profile__input profile__input_type_e-mail'
            type='email'
            name='email'
            id='email'
            placeholder='E-mail'
            autoComplete='off'
            defaultValue={user.email}
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

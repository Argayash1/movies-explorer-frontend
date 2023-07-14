import './Form.css';

function Form({
  type,
  name,
  values,
  formValid,
  buttonText,
  onSubmit,
  isProfileEdit = true,
  isLoading,
  loadingText,
  isRequestSuccessful,
  errorText,
  children,
  isOtherUserData = true,
}) {
  const formClassName = `form ${type === 'profile' ? 'form_type_profile' : ''}`;
  const submitButtonDisable = isLoading || !formValid || !isOtherUserData;
  const submitButtonClassName = `form__submit-button ${type === 'profile' && 'form__submit-button_type_profile'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className={formClassName} name={`${name}`} id='form' onSubmit={handleSubmit} noValidate>
      {children}
      <span className='form__error'>{errorText}</span>
      {isProfileEdit && (
        <button type='submit' className={submitButtonClassName} disabled={submitButtonDisable}>
          {isLoading ? loadingText : buttonText}
        </button>
      )}
    </form>
  );
}

export default Form;

import './Form.css';

function Form({
  type,
  name,
  values,
  formValid,
  children,
  buttonText,
  onSubmit,
  isProfileEdit = true,
  isLoading,
  loadingText,
}) {
  const submitButtonDisable = isLoading || !formValid;
  const submitButtonClassName = `form__submit-button ${!formValid && 'form__submit-button_disabled'} 
  ${type === 'profile' && 'form__submit-button_type_profile'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    onSubmit(values);
  };

  return (
    <form
      className={`form ${type === 'profile' ? 'form_type_profile' : ''}`}
      name={`${name}`}
      id='form'
      onSubmit={handleSubmit}
      noValidate
    >
      {children}
      {isProfileEdit && (
        <button type='submit' className={submitButtonClassName} disabled={submitButtonDisable}>
          {isLoading ? loadingText : buttonText}
        </button>
      )}
    </form>
  );
}

export default Form;

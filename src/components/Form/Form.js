import './Form.css';

function Form({ type, name, children, buttonText, onSubmit, isProfileEdit = true, isFormValid }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      action='#'
      className={`form ${type === 'profile' && 'form_type_profile'}`}
      name={name}
      onSubmit={handleSubmit}
    >
      {children}
      {isProfileEdit && (
        <button
          type='submit'
          className={`form__submit-button ${!isFormValid && 'form__submit-button_disabled'} 
          ${type === 'profile' && 'form__submit-button_type_profile'}`}
          disabled={!isFormValid && true}
        >
          {buttonText}
        </button>
      )}
    </form>
  );
}

export default Form;

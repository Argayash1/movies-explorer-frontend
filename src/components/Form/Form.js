import './Form.css';

function Form({ type, name, children, buttonText, onSubmit, isProfileEdit = true }) {
  return (
    <form action='#' className={`form ${type === 'profile' && 'form_type_profile'}`} name={name} onSubmit={onSubmit}>
      {children}
      {isProfileEdit && (
        <button
          type='submit'
          className={`form__submit-button ${type === 'profile' && 'form__submit-button_type_profile'}`}
        >
          {buttonText}
        </button>
      )}
    </form>
  );
}

export default Form;

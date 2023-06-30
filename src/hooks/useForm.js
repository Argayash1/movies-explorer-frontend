import { useState, useCallback, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  function onChange(e) {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: e.target.validationMessage }));
    const formValid = e.target.closest('form').checkValidity();
    value === currentUser.name || value === currentUser.email ? setFormValid(false) : setFormValid(formValid);
  }

  const resetValidation = useCallback(function reset(values = {}, errors = {}, formValid = false) {
    setValues(values);
    setErrors(errors);
    setFormValid(formValid);
  }, []);

  return { values, errors, formValid, onChange, resetValidation };
}

export default useForm;

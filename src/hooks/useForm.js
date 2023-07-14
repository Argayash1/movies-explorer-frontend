import { useState, useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';
import { NAME_ERROR, EMAIL_ERROR } from '../utils/configs/errorsConfig.js';

function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    if (name === 'name' && e.target.validity.patternMismatch) {
      e.target.setCustomValidity(NAME_ERROR);
    } else if (name === 'email' && !isEmail(value)) {
      e.target.setCustomValidity(EMAIL_ERROR);
    } else {
      e.target.setCustomValidity('');
    }
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: e.target.validationMessage }));
    const formValid = e.target.closest('form').checkValidity();
    setFormValid(formValid);
  }

  const resetValidation = useCallback(function reset(values = {}, errors = {}, formValid = false) {
    setValues(values);
    setErrors(errors);
    setFormValid(formValid);
  }, []);

  return { values, errors, formValid, onChange, resetValidation };
}

export default useForm;

import { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import {NO_KEY_WORD_ERROR} from '../../utils/configs/errorsConfig'

function SearchForm({ onSubmit, onFilter, isLoading, moviesRequest, isCheckBoxChecked }) {
  const [userRequest, setUserRequest] = useState('');
  const [errorText, setErrorText] = useState('');

  const { pathname } = useLocation();

  useEffect(() => {
    moviesRequest && setUserRequest(moviesRequest);
  }, [moviesRequest]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pathname !== '/movies' || userRequest) {
      onSubmit(userRequest);
      setErrorText('');
    } else {
      setErrorText(NO_KEY_WORD_ERROR);
    }
  };

  const handleChange = (e) => {
    setUserRequest(e.target.value);
  };

  return (
    <section className='search-form'>
      <form className='search-form__form' name='search-form' onSubmit={handleSubmit} noValidate>
        <div className='search-form__form-elements'>
          <label className='search-form__input-label'>
            <input
              className='search-form__input'
              type='search'
              value={userRequest || ''}
              name='search'
              id='search'
              onChange={handleChange}
              placeholder='Фильм'
              autoComplete='off'
              disabled={isLoading}
              required
            />
          </label>
          <button className='search-form__submit-button' type='submit' disabled={isLoading}>
            Поиск
          </button>
        </div>
        <span className='search-form__error'>{errorText}</span>
        <FilterCheckbox checked={isCheckBoxChecked} onFilter={onFilter} isLoading={isLoading}/>
      </form>
    </section>
  );
}

export default SearchForm;

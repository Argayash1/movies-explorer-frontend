import useForm from '../../hooks/useForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onFindMovies, onChekIsCheckboxChecked, checked, onFilter, isLoading, userRequest }) {
  const { values, errors, formValid, onChange } = useForm();
  const submitButtonDisable = isLoading || !formValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    onFindMovies(values.search);
  };

  return (
    <section className='search-form'>
      <form className='search-form__form' name='search-form' onSubmit={handleSubmit} noValidate>
        <div className='search-form__form-elements'>
          <label className='search-form__input-label'>
            <input
              className='search-form__input'
              type='search'
              value={values.search || userRequest || ''}
              name='search'
              id='search'
              onChange={onChange}
              placeholder='Фильм'
              autoComplete='off'
              minLength='1'
              required
            />
          </label>
          <button className='search-form__submit-button' type='submit' disabled={submitButtonDisable}>
            Поиск
          </button>
        </div>
        <FilterCheckbox onChekIsCheckboxChecked={onChekIsCheckboxChecked} checked={checked} onFilter={onFilter} />
      </form>
    </section>
  );
}

export default SearchForm;

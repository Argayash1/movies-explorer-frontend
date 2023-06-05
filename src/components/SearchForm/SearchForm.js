import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className='search-form'>
      <form className='search-form__form' noValidate>
        <input
          className='search-form__input'
          type='text'
          name='search'
          id='search'
          placeholder='Фильм'
          autoComplete='off'
          required
        />
        <button className='search-form__submit-button' type='submit'>
          Поиск
        </button>
      </form>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;

import SectionContent from '../SectionContent/SectionContent';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search-form'>
      <SectionContent>
        <form className='search-form__form'>
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
      </SectionContent>
    </section>
  );
}

export default SearchForm;

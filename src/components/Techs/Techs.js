import SectionTitle from '../SectionTitle/SectionTitle';
import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <div className='techs__content'>
        <SectionTitle text='Технологии' />
        <h3 className='techs__title'>7&nbsp;технологий</h3>
        <p className='techs__subtitle'>
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.
        </p>
        <ul className='techs__list'>
          <li className='techs__list-item'>
            <a href='https://ru.wikipedia.org/wiki/HTML' className='techs__list-link' target='_blank' rel='noreferrer'>
              HTML
            </a>
          </li>
          <li className='techs__list-item'>
            <a href='https://ru.wikipedia.org/wiki/CSS' className='techs__list-link' target='_blank' rel='noreferrer'>
              CSS
            </a>
          </li>
          <li className='techs__list-item'>
            <a
              href='https://ru.wikipedia.org/wiki/JavaScript'
              className='techs__list-link'
              target='_blank'
              rel='noreferrer'
            >
              JS
            </a>
          </li>
          <li className='techs__list-item'>
            <a href='https://ru.wikipedia.org/wiki/React' className='techs__list-link' target='_blank' rel='noreferrer'>
              React
            </a>
          </li>
          <li className='techs__list-item'>
            <a href='https://ru.wikipedia.org/wiki/Git' className='techs__list-link' target='_blank' rel='noreferrer'>
              Git
            </a>
          </li>
          <li className='techs__list-item'>
            <a
              href='https://ru.wikipedia.org/wiki/Express_(%D1%84%D1%80%D0%B5%D0%B9%D0%BC%D0%B2%D0%BE%D1%80%D0%BA)'
              className='techs__list-link'
              target='_blank'
              rel='noreferrer'
            >
              Express.js
            </a>
          </li>
          <li className='techs__list-item'>
            <a
              href='https://ru.wikipedia.org/wiki/MongoDB'
              className='techs__list-link'
              target='_blank'
              rel='noreferrer'
            >
              momgoDB
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;

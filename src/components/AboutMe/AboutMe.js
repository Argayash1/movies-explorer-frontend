import SectionTitle from '../SectionTitle/SectionTitle';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/about-me-photo.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className='about-me'>
      <div className='about-me__content'>
        <SectionTitle text='Студент' />
        <div className='about-me__info'>
          <h3 className='about-me__title'>Яков</h3>
          <p className='about-me__subtitle'>Фронтенд-разработчик, 41 год</p>
          <p className='about-me__bio'>
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена
            и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года
            работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал
            заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <a className='about-me__github-link' href='https://github.com/Argayash1' target='_blank' rel='noreferrer'>
            Github
          </a>
          <img className='about-me__photo' src={photo} alt='Фото автора проекта Movies-explorer' />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;

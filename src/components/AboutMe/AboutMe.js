import SectionTitle from '../SectionTitle/SectionTitle';
import photo from '../../images/about-me-photo.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className='about-me'>
      <SectionTitle text='Студент' />
      <article className='about-me__info'>
        <h3 className='about-me__title'>Яков</h3>
        <p className='about-me__subtitle'>Фронтенд-разработчик, 41 год</p>
        <p className='about-me__bio'>
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать
          музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
          как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <a className='about-me__github-link' href='https://github.com/Argayash1'>
          Github
        </a>
        <img className='about-me__photo' src={photo} alt='Фото автора сайта' />
      </article>
    </section>
  );
}

export default AboutMe;

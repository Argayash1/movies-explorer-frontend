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
            Я&nbsp;родился и&nbsp;живу в&nbsp;Екатеринбурге, получил высшее музыкальное образование.
            С&nbsp;подросткового возраста увлекаюсь компьютерами и&nbsp;немного&nbsp;&mdash; автомобилями. С&nbsp;2007
            по&nbsp;2022 год преподавал информатику. В 2022-2023 годах прошёл курс &laquo;Веб-разработчик&raquo;
            на&nbsp;&laquo;Яндекс-практикум&raquo; и&nbsp;ушёл с&nbsp;постоянной работы. После этого начал заниматься
            фриланс-заказами.
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

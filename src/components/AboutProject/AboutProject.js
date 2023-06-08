import SectionTitle from '../SectionTitle/SectionTitle';
import SectionContent from '../SectionContent/SectionContent';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project'>
      <SectionContent>
        <SectionTitle text='О проекте' />
        <ul className='about-project__descriptions'>
          <li className='about-project__descriptions-item'>
            <h3 className='about-project__descriptions-title'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__descriptions-text'>
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </li>
          <li className='about-project__descriptions-item'>
            <h3 className='about-project__descriptions-title'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__descriptions-text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className='about-project__schedule'>
          <li>
            <h4 className='about-project__schedule-title'>1 неделя</h4>
            <p className='about-project__schedule-text'>Back-end</p>
          </li>
          <li>
            <h4 className='about-project__schedule-title about-project__schedule-title_type_long'>4 недели</h4>
            <p className='about-project__schedule-text'>Front-end</p>
          </li>
        </ul>
      </SectionContent>
    </section>
  );
}

export default AboutProject;

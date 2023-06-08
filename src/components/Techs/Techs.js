import SectionContent from '../SectionContent/SectionContent';
import SectionTitle from '../SectionTitle/SectionTitle';
import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <SectionContent>
        <SectionTitle text='Технологии' />
        <h3 className='techs__title'>7 Технологий</h3>
        <p className='techs__subtitle'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className='techs__list'>
          <li className='techs__list-item'>HTML</li>
          <li className='techs__list-item'>CSS</li>
          <li className='techs__list-item'>JS</li>
          <li className='techs__list-item'>React</li>
          <li className='techs__list-item'>Git</li>
          <li className='techs__list-item'>Express.js</li>
          <li className='techs__list-item'>momgoDB</li>
        </ul>
      </SectionContent>
    </section>
  );
}

export default Techs;

import { Route, Routes } from 'react-router-dom';
import './SectionContent.css';

function SectionContent() {
  return (
    <div className='section-content'>
      <Routes>
        <Route path='/' element={<div> Ляля </div>} />
      </Routes>
    </div>
  );
}

export default SectionContent;

import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/JobInfo';

import { Form } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const JobInfo = ({ icon, text }) => {
    return(
       <Wrapper>
         <span className='job-icon'>{icon}</span>
      <span className='job-text'>{text}</span>
       </Wrapper>
    );
}

export default JobInfo;
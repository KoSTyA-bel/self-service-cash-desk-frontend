import React from 'react';

import useInterval from '../../utils/hoo/useInterval';
import { useNavigate } from 'react-router-dom';

import styles from './Timer.module.scss';

const Timer = () => {
  const navigate = useNavigate();
  const [time, setTime] = React.useState(300000 - (Date.now() - localStorage.getItem('time')));

  useInterval(() => {
    setTime(time - 1000);
  }, 1000);

  if (Date.now() - localStorage.getItem('time') > 300000) {
    localStorage.clear();
    navigate('/');
  }

  return <div className={styles.timer}>{Math.ceil(time / 60000)} minute left</div>;
};

export default Timer;

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ErrorPage.module.scss'
const ErrorPage = () => {

  return (
    <div className={styles.error}>
        <h1>Oops... Server error</h1>
        <Link to='/'>        
            <button className={styles.button}>RETRY</button>
        </Link>
    </div>
  );
};

export default ErrorPage;

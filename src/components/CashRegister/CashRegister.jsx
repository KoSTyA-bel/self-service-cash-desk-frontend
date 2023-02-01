import React from 'react';

import styles from './CashRegister.module.scss';

import cashregImg from '../../assets/img/cash.svg';

const CashRegister = ({ id, isActive, isBusy, index, onClick }) => {
  const isAdmin = true;

  return (
    <div
      onClick={() => onClick(isBusy, isActive, id)}
      className={`${isBusy ? styles.busyTrue : isActive ? styles.activeTrue : styles.activeFalse} ${
        styles.item
      }`}>
      <img className={styles.img} src={cashregImg} alt="cashreg" />
      <p className={styles.number}>#{index + 1}</p>
      {isAdmin ? (
        <div className={styles.menu}>
          <button>upd</button>
          <button>del</button>
        </div>
      ) : null}
    </div>
  );
};

export default CashRegister;

import React from "react";

import styles from "./CashRegister.module.scss";

import cashregImg from "../../assets/img/cash.svg";
import { useDispatch } from "react-redux";
import { freeFroUserSelfCheckout } from "../../redux/slices/selfCheckoutSlice";

const CashRegister = ({
  id,
  isActive,
  isBusy,
  index,
  onClick,
  isAdmin,
  onClickDelete,
  onClickChangeActivity,
  onClickMakeFree,
}) => {
  return (
    <div
      onClick={() => onClick(isBusy, isActive, id)}
      className={`${
        isBusy
          ? styles.busyTrue
          : isActive
          ? styles.activeTrue
          : styles.activeFalse
      } ${styles.item}`}
    >
      <img className={styles.img} src={cashregImg} alt="cashreg" />
      <p className={styles.number}>#{index + 1}</p>
      {isAdmin ? (
        <div className={styles.menu}>
          {isBusy ? (
            <button onClick={onClickMakeFree}>MakeFree</button>
          ) : (
            <button onClick={onClickChangeActivity}>ChangeActivity</button>
          )}
          <button onClick={onClickDelete}>Delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default CashRegister;

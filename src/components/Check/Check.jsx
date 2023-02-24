import React from "react";

import styles from "./Check.module.scss";

const Check = ({ check }) => {
  console.log(check);

  return (
    <div className={styles.block}>
      <div className={styles.item}>
        <p>Date</p>
        <div></div>
        <p>{new Date(check.date).toLocaleString()}</p>
      </div>
      <div className={styles.item}>
        <p>Self checkout number</p>
        <div></div>
        <p>{check.selfCheckout.id}</p>
      </div>
      <div className={styles.item}>
        <p>Amount</p>
        <div></div>
        <p>{check.amount.toFixed(2)}$</p>
      </div>
      <div className={styles.item}>
        <p>Discount</p>
        <div></div>
        <p>{check.discount.toFixed(2)}$</p>
      </div>
      <div className={styles.item}>
        <p>Total</p>
        <div></div>
        <p>{check.total.toFixed(2)}$</p>
      </div>
      {check.card === null ? null : (
        <div className={styles.item}>
          <p>Card number</p>
          <div></div>
          <p>{check.card.code}</p>
        </div>
      )}
    </div>
  );
};

export default Check;

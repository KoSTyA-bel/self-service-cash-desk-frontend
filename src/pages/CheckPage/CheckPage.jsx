import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { getCheck } from '../../redux/slices/checkSlice';

import styles from './CheckPage.module.scss';

const CheckPage = () => {
  const dispatch = useDispatch();
  const checkId = useSelector((state) => state.selfCheckouts.checkId);
  const check = useSelector((state) => state.check.check.data);
  const loading = useSelector((state) => state.check.check.loading);

  React.useEffect(() => {
    console.log("123");
    dispatch(getCheck(checkId));
  }, []);



  return (
    <>{check === null ? <Loader /> : (
      <div className={styles.check}>
      <h1>Check</h1>
      <div className={styles.block}>
        <div className={styles.item}>
          <p>Date</p>
          <div></div>
          <p>{check.date}</p>
        </div>
        <div className={styles.item}>
          <p>Self checkout number</p>
          <div></div>
          <p>{check.selfCheckout.id}</p>
        </div>
        <div className={styles.item}>
          <p>Amount</p>
          <div></div>
          <p>{check.amount}</p>
        </div>
        <div className={styles.item}>
          <p>Discount</p>
          <div></div>
          <p>{check.discount}</p>
        </div>
        <div className={styles.item}>
          <p>Total</p>
          <div></div>
          <p>{check.total}</p>
        </div>

        {check.card === null ? null : 
        <div className={styles.item}>
          <p>Card number</p>
          <div></div>
          <p>{check.card.code}</p>
        </div>}
      </div>
    </div>
    )}</>    
  );
};

export default CheckPage;

import React from 'react';

import CashRegister from '../../components/CashRegister/CashRegister';
import Header from '../../components/Header/Header';

import { Link, useNavigate, redirect } from 'react-router-dom';

import styles from './HomePage.module.scss';

import { getSelfCheckouts, takeSelfCheckout } from '../../redux/slices/selfCheckoutSlice';

import { useDispatch, useSelector } from 'react-redux';

import loader from "../../assets/img/loader.svg"
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.selfCheckouts.selfCheckouts);
  const { loading } = useSelector((state) => state.selfCheckouts.selfCheckouts);

  const onClickSelfCheckout = async (isBusy, isActive, id) => {
    if (isActive === false || isBusy === true) {
      navigate('/');
    } else {
      const { error } = await dispatch(takeSelfCheckout(id));
      if (error === undefined){
        navigate('/products');
      }
      else{
        alert("КАССА ЗАНЯТА");
        await dispatch(getSelfCheckouts());
      }
    }
  };

  React.useEffect(() => {
    dispatch(getSelfCheckouts());
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <Header />
      <h1>Select a cash register </h1>
      <div className={styles.cashregs}>
        {items.map((obj, index) => (
          <CashRegister onClick={onClickSelfCheckout} key={obj.id} {...obj} index={index} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

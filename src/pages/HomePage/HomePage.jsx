import React from "react";

import CashRegister from "../../components/CashRegister/CashRegister";
import Header from "../../components/Header/Header";

import { Link, useNavigate, redirect } from "react-router-dom";

import styles from "./HomePage.module.scss";

import {
  freeSelfCheckout,
  getSelfCheckouts,
  takeSelfCheckout,
} from "../../redux/slices/selfCheckoutSlice";

import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader/Loader";

import Timer from "../../components/Timer/Timer";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.selfCheckouts.selfCheckouts);
  const { loading } = useSelector((state) => state.selfCheckouts.selfCheckouts);
  const cartNumber = JSON.parse(localStorage.getItem("guid")) || null;
  const selfCheckoutId =
    JSON.parse(localStorage.getItem("selfCheckoutId")) || null;
  const [selfCheckoutParams, setSelfCheckoutParams] = React.useState({
    id: selfCheckoutId,
    cartNumber: cartNumber,
  });

  const onClickSelfCheckout = async (isBusy, isActive, id) => {
    if (isActive === false || isBusy === true) {
      navigate("/");
    } else {
      const { error } = await dispatch(takeSelfCheckout(id));
      if (error === undefined) {
        navigate("/products");
      } else {
        alert("КАССА ЗАНЯТА");
        await dispatch(getSelfCheckouts());
      }
    }
  };

  const onClickBack = () => {
    Date.now() - localStorage.getItem("time") > 300000
      ? navigate("/")
      : navigate("/products");
    console.log(new Date().toLocaleString());
  };
  const onClickMakeFree = async () => {
    await dispatch(freeSelfCheckout(selfCheckoutParams));
    dispatch(getSelfCheckouts());
  };

  React.useEffect(() => {
    dispatch(getSelfCheckouts());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <h1>Select a cash register </h1>
      {localStorage.getItem("time") - Date.now() <= 0 ? (
        <div className={styles.cashregs}>
          {items === null ? (
            <p>There are no self-service checkouts</p>
          ) : (
            items.map((obj, index) => (
              <CashRegister
                onClick={onClickSelfCheckout}
                key={obj.id}
                {...obj}
                index={index}
                isAdmin={false}
              />
            ))
          )}
        </div>
      ) : (
        <div className={styles.backBlock}>
          <Timer />
          <button onClick={onClickBack} className={styles.back}>
            Back to products
          </button>
          <button onClick={onClickMakeFree} className={styles.makeFree}>
            Make Selfcheckout free
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;

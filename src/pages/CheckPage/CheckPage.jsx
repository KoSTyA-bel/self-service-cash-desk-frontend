import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { getCheck, sendCheckToEmail } from "../../redux/slices/checkSlice";
import { AiFillHome } from "react-icons/ai";
import styles from "./CheckPage.module.scss";
import { Link } from "react-router-dom";

const CheckPage = () => {
  const dispatch = useDispatch();
  const checkId = useSelector((state) => state.selfCheckouts.checkId);
  const check = useSelector((state) => state.check.check.data);
  const isMailSended = useSelector((state) => state.check.isMailSended);
  const [email, setEmail] = useState("");
  console.log(isMailSended);

  const sendEmail = async (e) => {
    e.preventDefault();

    await dispatch(sendCheckToEmail({ email, checkId }));
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  React.useEffect(() => {
    dispatch(getCheck(checkId));
  }, []);

  return (
    <>
      {check === null ? (
        <Loader />
      ) : (
        <div className={styles.check}>
          <Link to="/">
            <button>
              <AiFillHome className={styles.home} />
            </button>
          </Link>
          <h1>Check</h1>

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
          <form className={styles.mailForm} onSubmit={sendEmail}>
            <input
              className={isMailSended ? styles.sended : styles.unsended}
              onChange={onEmailChange}
              required
              placeholder="ivanivanov@mail.ru"
              type="email"
              name="emailAddress"
              id="email"
            />
            {isMailSended ? null : <button>Send</button>}
          </form>
        </div>
      )}
    </>
  );
};

export default CheckPage;

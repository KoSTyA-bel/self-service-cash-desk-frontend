import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../../components/Product/Product';

import { useSelector, useDispatch } from 'react-redux';
import { addProduct, getCheck, updateCart } from '../../redux/slices/cartSlice';
import { getCard } from '../../redux/slices/checkSlice';
import { paySelfCheckout } from '../../redux/slices/selfCheckoutSlice';
import { useNavigate } from 'react-router-dom';

import { BsCart2, BsFillArrowLeftSquareFill } from 'react-icons/bs';

import styles from './CartPage.module.scss';
import Loader from '../../components/Loader/Loader';

import useDebounce from '../../utils/hoo/useDebounce';
import Timer from '../../components/Timer/Timer';

const CartPage = () => {
  const [code, setCode] = useState('');
  const cartNumber = JSON.parse(localStorage.getItem('guid'));
  const selfCheckoutId = JSON.parse(localStorage.getItem('selfCheckoutId'));
  const cart = useSelector((state) => state.cart.cart.items);
  const loading = useSelector((state) => state.cart.cart.loading);
  const card = useSelector((state) => state.check.check.card);
  const debouncedCard = useDebounce(code, 500);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [checkData, setCheckData] = React.useState({
    selfCheckoutId: selfCheckoutId,
    cartNumber: cartNumber,
    cardCode: code,
  });

  const handleChange = (e) => {
    const { value } = e.target;

    setCode(value);
  };

  const onClickPay = async () => {
    checkData.cardCode = code;
    await dispatch(paySelfCheckout(checkData));
    navigate('/check');
  };

  React.useEffect(() => {
    dispatch(updateCart(cartNumber));
  }, []);

  React.useEffect(() => {
    dispatch(getCard(debouncedCard));
  }, [debouncedCard]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <Link to="/products">
          <BsFillArrowLeftSquareFill className={styles.arrow} />
        </Link>
        <h1>Cart</h1>
      </div>
      <Timer />
      {cart.products && cart.products.map((obj, index) => <Product key={index} product={obj} />)}
      <p className={styles.price}>Total price: {cart.price.toFixed(2)}$</p>
      <div className={styles.footer}>
        <input
          className={card === undefined ? styles.input : styles.correctInput}
          type="text"
          value={code}
          placeholder="Card code"
          onChange={handleChange}
        />
        <button onClick={onClickPay}>Pay</button>
      </div>
    </div>
  );
};

export default CartPage;

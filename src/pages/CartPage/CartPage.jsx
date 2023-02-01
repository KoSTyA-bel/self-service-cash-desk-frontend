import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../../components/Product/Product';

import { useSelector, useDispatch } from 'react-redux';
import { addProduct, getCheck, updateCart } from '../../redux/slices/cartSlice';
import { getProducts } from '../../redux/slices/productSlice';
import { paySelfCheckout } from '../../redux/slices/selfCheckoutSlice';
import { useNavigate } from 'react-router-dom';

import { BsCart2, BsFillArrowLeftSquareFill } from 'react-icons/bs';

import styles from './CartPage.module.scss';
import Loader from '../../components/Loader/Loader';

const CartPage = () => {
  const [code, setCode] = useState('');
  const cartNumber = JSON.parse(localStorage.getItem('guid'));
  const selfCheckoutId = JSON.parse(localStorage.getItem('selfCheckoutId'));
  const cart = useSelector((state) => state.cart.cart.items);
  const loading = useSelector((state) => state.cart.cart.loading);
  const checkId = useSelector((state) => state.selfCheckouts.checkId);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [checkData, setCheckData] = React.useState({
    selfCheckoutId: selfCheckoutId,
    cartNumber: cartNumber,
    cardCode: code,
  });

  const onClickPay = async () => {
    checkData.cardCode = code;
    await dispatch(paySelfCheckout(checkData));
    navigate('/check');
  };

  React.useEffect(() => {
    dispatch(updateCart(cartNumber));
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <Link to="/products">
          <BsFillArrowLeftSquareFill className={styles.arrow} />
        </Link>
        <h1>Cart</h1>
      </div>
      {cart.products && cart.products.map((obj, index) => <Product key={index} product={obj} />)}
      <p className={styles.price}>Total price: {cart.price}</p>
      <div className={styles.footer}>
        <input
          className={styles.input}
          type="text"
          value={code}
          placeholder="Card code"
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={onClickPay}>Pay</button>
      </div>
    </div>
  );
};

export default CartPage;

import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateCart } from '../../redux/slices/cartSlice';

import styles from './Product.module.scss';

const Product = ({ id, product, index }) => {

  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.products.products);
  
  const page = useSelector((state) => state.products.page);

  const cartNumber = JSON.parse(localStorage.getItem('guid'));

  const onClickAddProduct = async () => {
    await dispatch(addProduct({ cartNumber: cartNumber, productId: id }));
    await dispatch(updateCart(cartNumber));
  }

  return (
    <div onClick={onClickAddProduct}
      className={styles.item}>
      <p className={styles.name}>{product.name}</p>
      <p className={styles.description}>Description: {product.description}</p>
      <p className={styles.barcode}>Barcode: {product.barcode}</p>
      <p className={styles.price}>Price: {product.price.toFixed(2)}$</p>
    </div>
  );
};

export default Product;

import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  updateCart,
} from "../../redux/slices/cartSlice";

import {
  deleteProduct,
  deleteStock,
  writeStock,
} from "../../redux/slices/productSlice";

import noImg from "../../assets/img/noImage.svg";

import styles from "./Product.module.scss";
import { Link, useNavigate } from "react-router-dom";

const Product = ({
  id,
  product,
  count,
  isAdmin,
  isCartPage,
  onClickDeleteProduct,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products.products);

  const page = useSelector((state) => state.products.page);

  const cartNumber = JSON.parse(localStorage.getItem("guid"));
  const selfCheckoutId = JSON.parse(localStorage.getItem("selfCheckoutId"));

  const onClickAddProduct = async (id) => {
    await dispatch(
      addProduct({
        cartNumber: cartNumber,
        productId: id,
        selfChecoutId: selfCheckoutId,
      })
    );
    await dispatch(updateCart(cartNumber));
  };

  const onClickRemoveProduct = async (id) => {
    await dispatch(
      removeProduct({
        cartNumber: cartNumber,
        productId: id,
        selfChecoutId: selfCheckoutId,
      })
    );
    await dispatch(updateCart(cartNumber));
  };

  const onClickUpdateProduct = async (data) => {
    await dispatch(writeStock(data));
    navigate("update");
  };

  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <img src={noImg} alt="no image" />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.description}>Description: {product.description}</p>
        <p className={styles.barcode}>Barcode: {product.barcode}</p>
        <p className={styles.price}>Price: {product.price.toFixed(2)}$</p>
        {isAdmin ? <p className={styles.count}>Count: {count}</p> : null}
      </div>
      {isAdmin ? (
        <div className={styles.buttons}>
          <button onClick={() => onClickUpdateProduct({ id, product, count })}>
            Update
          </button>
          <button onClick={onClickDeleteProduct}>Delete</button>
        </div>
      ) : isCartPage ? (
        <div className={styles.buttons}>
          <button onClick={() => onClickRemoveProduct(product.id)}>
            Remove
          </button>
        </div>
      ) : (
        <div className={styles.buttons}>
          <button onClick={() => onClickAddProduct(product.id)}>Add</button>
        </div>
      )}
    </div>
  );
};

export default Product;

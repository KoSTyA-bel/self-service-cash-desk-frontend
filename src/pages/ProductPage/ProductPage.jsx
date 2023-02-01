import React from 'react';
import { Link } from 'react-router-dom';
import Product from '../../components/Product/Product';
import Pagination from '../../components/Pagination/Pagination';

import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateCart } from '../../redux/slices/cartSlice';
import { getProducts } from '../../redux/slices/productSlice';
import { BsCart2, BsFillArrowLeftSquareFill } from 'react-icons/bs';

import styles from './ProductPage.module.scss';
import Loader from '../../components/Loader/Loader';

const ProductPage = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.products.products);
  const { loading } = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.cart.items.products);
  const pageNumber = useSelector((state) => state.products.page);

  React.useEffect(() => {
    dispatch(getProducts(pageNumber));
  }, [pageNumber]);

  if (loading) {
    return <Loader/>
  }

  return (
    <div>
      <div className={styles.header}>
        <Link to="/">
          <BsFillArrowLeftSquareFill className={styles.arrow} />
        </Link>
        <h1>Add products to your cart</h1>
        <Link to="/cart">
          <button>
            <BsCart2 className={styles.cart} />
            <p>{(cartItems && cartItems.length) || 0}</p>
          </button>
        </Link>
      </div>
      {items.map((obj, index) => (
        <Product key={obj.id} index={index} {...obj} />
      ))}
      <Pagination />
    </div>
  );
};

export default ProductPage;

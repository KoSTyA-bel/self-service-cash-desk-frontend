import React from 'react';
import { Link } from 'react-router-dom';
import Product from '../../components/Product/Product';
import Pagination from '../../components/Pagination/Pagination';

import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateCart } from '../../redux/slices/cartSlice';
import { getProducts, getProductsOnNextPage, toFirstPage } from '../../redux/slices/productSlice';
import { BsCart2, BsFillArrowLeftSquareFill, BsSearch } from 'react-icons/bs';

import styles from './ProductPage.module.scss';
import Loader from '../../components/Loader/Loader';
import Timer from '../../components/Timer/Timer';

const ProductPage = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = React.useState('');
  const [barcode, setBarcode] = React.useState('');

  const { items } = useSelector((state) => state.products.products);
  const { loading } = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.cart.items.products);
  const pageNumber = useSelector((state) => state.products.page);

  const cartNumber = JSON.parse(localStorage.getItem('guid'));

  const onClickAddProduct = async (id) => {
    await dispatch(addProduct({ cartNumber: cartNumber, productId: id }));
    await dispatch(updateCart(cartNumber));
  }

  const onClickSearch = async () => {
    console.log(pageNumber, title, barcode);
    await dispatch(toFirstPage());
    await dispatch(getProducts({ pageNumber, title, barcode }));
    await dispatch(getProductsOnNextPage({ pageNumber, title, barcode }));
  };

  React.useEffect(() => {
    dispatch(getProducts({ pageNumber, title, barcode }));
    dispatch(getProductsOnNextPage({ pageNumber, title, barcode }));
    dispatch(updateCart(cartNumber));
  }, [pageNumber]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClickSearch();
    }
  };

  if (loading) {
    return <Loader />;
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
      <div className={styles.inputs}>
        <button onClick={onClickSearch}>
          <BsSearch className={styles.search} />
        </button>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          value={barcode}
          placeholder="Barcode"
          onChange={(e) => {
            setBarcode(e.target.value);
          }}
        />
        <Timer />
      </div>
      {items === undefined ? (
        <h1>No products</h1>
      ) : (
        items.map((obj, index) => <div onClick={() => onClickAddProduct(obj.id)} key={obj.id} index={index}>
          <Product  {...obj} />
        </div>)
      )}

      {items === undefined ? null : <Pagination />}
    </div>
  );
};

export default ProductPage;

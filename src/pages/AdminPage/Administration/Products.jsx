import React from "react";
import { Link } from "react-router-dom";
import Product from "../../../components/Product/Product";
import Pagination from "../../../components/Pagination/Pagination";

import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateCart } from "../../../redux/slices/cartSlice";
import {
  getProducts,
  getProductsOnNextPage,
  toFirstPage,
  deleteProduct,
  deleteStock,
} from "../../../redux/slices/productSlice";
import { BsCart2, BsFillArrowLeftSquareFill, BsSearch } from "react-icons/bs";

import styles from "../../ProductPage/ProductPage.module.scss";
import Loader from "../../../components/Loader/Loader";
import { updateTimer } from "../../../redux/slices/selfCheckoutSlice";

const Products = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = React.useState("");
  const [barcode, setBarcode] = React.useState("");

  const { items } = useSelector((state) => state.products.products);
  const { loading } = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.cart.items.products);
  const pageNumber = useSelector((state) => state.products.page);
  const selfCheckout = JSON.parse(localStorage.getItem("selfCheckoutId"));

  const cartNumber = JSON.parse(localStorage.getItem("guid"));

  const onClickSearch = async () => {
    console.log(pageNumber, title, barcode);
    await dispatch(toFirstPage());
    await dispatch(getProducts({ pageNumber, title, barcode }));
    await dispatch(getProductsOnNextPage({ pageNumber, title, barcode }));
  };

  const onClickDeleteProduct = async (id, productId) => {
    await dispatch(deleteProduct(productId));
    await dispatch(deleteStock(id));
    dispatch(getProducts({ pageNumber, title, barcode }));
  };

  React.useEffect(() => {
    dispatch(getProducts({ pageNumber, title, barcode }));
    dispatch(getProductsOnNextPage({ pageNumber, title, barcode }));
  }, [pageNumber]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClickSearch();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className={styles.header}>
        <Link to="/admin">
          <BsFillArrowLeftSquareFill className={styles.arrow} />
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
        <Link to="create">
          <button>Create</button>
        </Link>
      </div>
      {items.length === 0 ? (
        <h1>No products</h1>
      ) : (
        items.map((obj, index) => (
          <div key={obj.id} index={index}>
            <Product
              {...obj}
              isAdmin={true}
              onClickDeleteProduct={() =>
                onClickDeleteProduct(obj.id, obj.product.id)
              }
            />
          </div>
        ))
      )}

      {items.length === 0 ? null : <Pagination />}
    </div>
  );
};

export default Products;

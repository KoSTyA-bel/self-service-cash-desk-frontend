import React from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createProduct,
  createStock,
  updateProduct,
  updateStock,
} from "../../../redux/slices/productSlice";

import styles from "./Administration.module.scss";

const ProductUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stock = useSelector((state) => state.products.stock);
  const [data, setData] = React.useState({
    name: stock.product.name,
    description: stock.product.description,
    price: stock.product.price,
    weight: stock.product.weight,
    barcode: stock.product.barcode,
    photo: stock.product.photo,
  });
  const [productCount, setCount] = React.useState(stock.count);
  const onChangeName = (e) => {
    setData({ ...data, name: e.target.value });
  };
  const onChangeDescription = (e) => {
    setData({ ...data, description: e.target.value });
  };
  const onChangePrice = (e) => {
    setData({ ...data, price: e.target.value });
  };
  const onChangeWeight = (e) => {
    setData({ ...data, weight: e.target.value });
  };
  const onChangeBarcode = (e) => {
    setData({ ...data, barcode: e.target.value });
  };
  const onChangePhoto = (e) => {
    setData({ ...data, photo: e.target.value });
  };

  const onChangeCount = async (e) => {
    setCount(Number(e.target.value));
  };

  const onClickButton = async () => {
    const response = await dispatch(
      updateProduct({ id: stock.product.id, data })
    );
    if (response.payload.status === 400) {
      alert(response.payload.data.message);
    } else {
      await dispatch(
        updateStock({ id: stock.id, data: { count: productCount } })
      );
      navigate("/admin/products");
    }
  };

  return (
    <form className={styles.create}>
      <header>
        <Link to="/admin/products">
          <BsFillArrowLeftSquareFill className={styles.arrow} />
        </Link>
        <h1>Update</h1>
      </header>
      <input
        required
        placeholder="Name"
        onChange={onChangeName}
        type="text"
        value={data.name}
      />
      <input
        required
        value={data.description}
        placeholder="Description"
        onChange={onChangeDescription}
        type="text"
      />
      <input
        required
        value={data.price}
        placeholder="Price"
        onChange={onChangePrice}
        type="number"
      />
      <input
        required
        value={data.weight}
        placeholder="Weight"
        onChange={onChangeWeight}
        type="number"
      />
      <input
        required
        value={data.barcode}
        placeholder="Barcode"
        onChange={onChangeBarcode}
        type="text"
      />
      <input
        placeholder="Photo URL"
        onChange={onChangePhoto}
        type="text"
        value={data.photo}
      />
      <input
        required
        value={productCount}
        placeholder="Count"
        onChange={onChangeCount}
        type="number"
      />
      <button type="submit" onClick={onClickButton}>
        Create
      </button>
    </form>
  );
};

export default ProductUpdate;

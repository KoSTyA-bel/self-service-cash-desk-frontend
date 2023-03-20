import React from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createProduct, createStock } from "../../../redux/slices/productSlice";
import styles from "./Administration.module.scss";

const ProductCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    name: "",
    description: "",
    price: 0,
    weight: 0,
    barcode: "",
    photo: "",
  });
  const [productCount, setCount] = React.useState(0);

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

  const onClickButton = async (e) => {
    e.preventDefault();
    const response = await dispatch(createProduct(data));
    if (response.payload.status === 400) {
      alert(response.payload.data.message);
    } else {
      await dispatch(
        createStock({ count: productCount, productId: response.payload })
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
        <h1>Create</h1>
      </header>
      <input required placeholder="Name" onChange={onChangeName} type="text" />
      <input
        required
        placeholder="Description"
        onChange={onChangeDescription}
        type="text"
      />
      <input
        required
        placeholder="Price"
        onChange={onChangePrice}
        type="number"
      />
      <input
        required
        placeholder="Weight"
        onChange={onChangeWeight}
        type="number"
      />
      <input
        required
        placeholder="Barcode"
        onChange={onChangeBarcode}
        type="text"
      />
      <input placeholder="Photo URL" onChange={onChangePhoto} type="text" />
      <input
        required
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

export default ProductCreate;

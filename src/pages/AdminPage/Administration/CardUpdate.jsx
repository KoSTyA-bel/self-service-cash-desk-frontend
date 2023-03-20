import { getRoles } from "@testing-library/react";
import React, { useEffect } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateCard } from "../../../redux/slices/cardSlice";
import styles from "./Administration.module.scss";

const CardUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const card = useSelector((state) => state.cards.card);
  const [data, setData] = React.useState({
    discount: card.discount,
    profileId: card.profileId,
  });

  const onChangeDiscount = (e) => {
    setData({ ...data, discount: e.target.value });
  };

  const onClickButton = async (e) => {
    e.preventDefault();

    const response = await dispatch(updateCard({ id: card.id, data }));

    if (response.payload.status === 400) {
      alert(response.payload.data.message);
    } else {
      navigate("/admin/cards");
    }
  };

  return (
    <form className={styles.create}>
      <header>
        <Link to="/admin/cards">
          <BsFillArrowLeftSquareFill className={styles.arrow} />
        </Link>
        <h1>Update</h1>
      </header>
      <input
        required
        placeholder="Discount"
        onChange={onChangeDiscount}
        type="number"
        min={0}
        max={100}
        value={data.discount}
      />
      <button type="submit" onClick={onClickButton}>
        Update
      </button>
    </form>
  );
};

export default CardUpdate;

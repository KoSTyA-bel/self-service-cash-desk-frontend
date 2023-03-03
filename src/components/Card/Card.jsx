import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { writeCard } from "../../redux/slices/cardSlice";

import styles from "./Card.module.scss";

const Card = ({ id, code, cvv, profile, total, discount, onClickDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickUpdateCard = (data) => {
    dispatch(writeCard(data));
    navigate("update");
  };

  return (
    <div className={styles.card}>
      <div className={styles.item}>
        <p>Code</p>
        <p>{code}</p>
      </div>
      <div className={styles.item}>
        <p>CVV</p>
        <p>{cvv}</p>
      </div>
      <div className={styles.item}>
        <p>Total</p>
        <p>{total}</p>
      </div>
      <div className={styles.item}>
        <p>Discount</p>
        <p>{discount}</p>
      </div>
      <div className={styles.item}>
        <p>ProfileName</p>
        <p>{profile.fullName}</p>
      </div>
      <div className={styles.item}>
        <p>Role</p>
        <p>{profile.role.name}</p>
      </div>

      <div className={styles.buttons}>
        <button
          onClick={() =>
            onClickUpdateCard({ id, profileId: profile.id, discount })
          }
        >
          Update
        </button>
        <button onClick={onClickDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Card;

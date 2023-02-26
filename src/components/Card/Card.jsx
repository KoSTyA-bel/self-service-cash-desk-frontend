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
    <div>
      <p>Code</p>
      <p>{code}</p>
      <p>CVV</p>
      <p>{cvv}</p>
      <p>Total</p>
      <p>{total}</p>
      <p>Discount</p>
      <p>{discount}</p>
      <p>ProfileName</p>
      <p>{profile.fullName}</p>
      <p>Role</p>
      <p>{profile.role.name}</p>
      <button
        onClick={() =>
          onClickUpdateCard({ id, profileId: profile.id, discount })
        }
      >
        Update
      </button>
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};

export default Card;

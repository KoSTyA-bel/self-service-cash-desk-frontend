import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../../components/Card/Card";
import styles from "./Administration.module.scss";

import {
  deleteCard,
  getCards,
  getRoles,
} from "../../../redux/slices/cardSlice";
import { Link } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const Cards = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cards.cards);

  const onClickDelete = async (id) => {
    await dispatch(deleteCard(id));
    dispatch(getCards());
  };

  React.useEffect(() => {
    dispatch(getRoles());
    dispatch(getCards());
  }, []);

  return (
    <div className={styles.cards}>
      <header>
        <Link to="/admin">
          <BsFillArrowLeftSquareFill className={styles.arrow} />
        </Link>
        <h1>Cards</h1>
      </header>
      <div>
        <Link to="create">
          <button className={styles.buttonCreate}>Create</button>
        </Link>
        <div className={styles.card}>
          {items === null
            ? null
            : items.map((obj, index) => (
                <Card
                  {...obj}
                  key={index}
                  onClickDelete={() => onClickDelete(obj.id)}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;

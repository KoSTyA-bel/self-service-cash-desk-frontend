import { getRoles } from "@testing-library/react";
import React, { useEffect } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createProfile,
  createCard,
  deleteProfile,
} from "../../../redux/slices/cardSlice";
import styles from "./Administration.module.scss";

const CardCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.cards.roles);
  const [data, setData] = React.useState({
    fullName: "",
    code: "",
    cvv: 0,
    discount: 0,
  });
  const [roleId, setRoleId] = React.useState(roles[0].id);

  const onChangeName = (e) => {
    setData({ ...data, fullName: e.target.value });
  };

  const onChangeCode = (e) => {
    setData({ ...data, code: e.target.value });
  };

  const onChangeCVV = (e) => {
    setData({ ...data, cvv: e.target.value });
  };

  const onChangeDiscount = (e) => {
    setData({ ...data, discount: e.target.value });
  };

  const onChangeRole = (e) => {
    setRoleId(e.target.value);
  };

  const onClickButton = async () => {
    const response = await dispatch(
      createProfile({ fullName: data.fullName, roleId })
    );
    if (response.payload.status === 400) {
      alert(response.payload.data.message);
    } else {
      const cardResponse = await dispatch(
        createCard({
          code: data.code,
          cvv: data.cvv,
          discount: data.discount,
          profileId: response.payload,
        })
      );

      if (cardResponse.payload.status == 400) {
        dispatch(deleteProfile(response.payload));
        alert(cardResponse.payload.data.message);
      } else {
        navigate("/admin/cards");
      }
    }
  };

  return (
    <form className={styles.create}>
      <header>
        <Link to="/admin/cards">
          <BsFillArrowLeftSquareFill className={styles.arrow} />
        </Link>
        <h1>Create</h1>
      </header>
      <select onChange={onChangeRole}>
        {roles === null
          ? null
          : roles.map((obj, index) => (
              <option value={obj.id}>{obj.name}</option>
            ))}
      </select>
      <input
        required
        placeholder="FullName"
        onChange={onChangeName}
        type="text"
        maxLength={50}
      />
      <input
        required
        placeholder="Code"
        onChange={onChangeCode}
        type="text"
        maxLength={16}
      />
      <input
        required
        placeholder="CVV"
        onChange={onChangeCVV}
        type="text"
        maxLength={3}
      />
      <input
        required
        placeholder="Discount"
        onChange={onChangeDiscount}
        type="number"
        min={0}
        max={100}
      />
      <button type="submit" onClick={onClickButton}>
        Create
      </button>
    </form>
  );
};

export default CardCreate;

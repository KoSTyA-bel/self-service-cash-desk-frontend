import React from "react";
import { AiFillHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAuth } from "../../redux/slices/authSlice";

import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = useSelector((state) => state.auth.data);
  const [data, setData] = React.useState({
    name: "",
    password: "",
  });

  const onChangeLogin = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const onChangePassword = (e) => {
    setData({ ...data, password: e.target.value });
  };

  const onClickButton = async (e) => {
    e.preventDefault();
    await dispatch(fetchAuth(data));
    navigate("/");
  };

  return (
    <form className={styles.form}>
      <header>
        <Link to="/">
          <button className={styles.backToHomePageButton}>
            <AiFillHome className={styles.home} />
          </button>
        </Link>
        <h1>Login</h1>
      </header>
      <div className={styles.authInputs}>
        <input
          placeholder="login"
          onChange={onChangeLogin}
          value={data.name}
          type="text"
        />
        <input
          placeholder="password"
          onChange={onChangePassword}
          value={data.password}
          type="password"
        />
        <button
          className={styles.loginButton}
          onClick={onClickButton}
          type="submit"
        >
          sign in
        </button>
      </div>
    </form>
  );
};

export default AuthPage;

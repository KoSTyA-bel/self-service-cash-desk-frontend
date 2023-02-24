import React from "react";
import { AiFillHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Check from "../../components/Check/Check";
import { viewHistory } from "../../redux/slices/checkSlice";

import styles from "./HistoryPage.module.scss";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState({ code: "", cvv: "" });
  const checks = useSelector((state) => state.check.checks);

  const onCodeChange = (e) => {
    setData({ ...data, code: e.target.value });
  };

  const onCVVChange = (e) => {
    setData({ ...data, cvv: e.target.value });
  };

  const onClickSearch = async (e) => {
    e.preventDefault();
    await dispatch(viewHistory(data));
  };

  return (
    <div>
      <header>
        <Link to="/">
          <button>
            <AiFillHome className={styles.home} />
          </button>
        </Link>
        <h1>History</h1>
      </header>
      <form className={styles.inputs}>
        <input placeholder="code" onChange={onCodeChange} type="text" />
        <input placeholder="cvv" onChange={onCVVChange} type="password" />
        <button onClick={onClickSearch}>Search</button>
      </form>

      {checks === null ? null : checks.map((obj) => <Check check={obj} />)}
    </div>
  );
};

export default HistoryPage;

import React from "react";
import { AiFillHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Check from "../../components/Check/Check";
import {
  clearHistory,
  viewHistory,
  viewStatistic,
} from "../../redux/slices/checkSlice";

import styles from "./HistoryPage.module.scss";

import BarChart from "../../components/Charts/BarChart";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState({ code: "", cvv: "" });
  const [chartData, setChartData] = React.useState({
    labels: "",
    datasets: [
      {
        label: "",
        data: "",
      },
    ],
  });
  const checks = useSelector((state) => state.check.checks);
  const statistic = useSelector((state) => state.check.statistic);

  const onCodeChange = (e) => {
    setData({ ...data, code: e.target.value });
  };

  const onCVVChange = (e) => {
    setData({ ...data, cvv: e.target.value });
  };

  const onClickSearch = async (e) => {
    e.preventDefault();
    await dispatch(viewHistory(data));
    const response = await dispatch(viewStatistic(data));

    const products = response.payload.products;
    const counts = response.payload.counts;

    setChartData({
      labels: products,
      datasets: [
        {
          label: "Count of product",
          data: counts,
        },
      ],
    });
  };

  React.useEffect(() => {
    dispatch(clearHistory());
  }, []);

  return (
    <div>
      <header>
        <Link to="/">
          <button className={styles.backToHomePage}>
            <AiFillHome className={styles.home} />
          </button>
        </Link>
        <h1>History</h1>
      </header>
      <form className={styles.inputs}>
        <input
          placeholder="code"
          onChange={onCodeChange}
          type="text"
          maxLength={16}
        />
        <input
          placeholder="cvv"
          onChange={onCVVChange}
          type="password"
          maxLength={3}
        />
        <button className={styles.buttonViewHistory} onClick={onClickSearch}>
          Search
        </button>
      </form>
      <div className={styles.checkData}>
        {statistic === null ? null : (
          <div className={styles.statisticDiv}>
            <p>Average check price: {statistic.averagePrice}</p>
            <p>Total discount: {statistic.totalDiscount}</p>
            <p>Total: {statistic.total}</p>
            <BarChart
              chartData={{
                labels: statistic.products,
                datasets: [
                  {
                    label: "Count of product",
                    data: statistic.counts,
                    backgroundColor: statistic.counts.map(() => {
                      let x = Math.floor(Math.random() * 256);
                      let y = Math.floor(Math.random() * 256);
                      let z = Math.floor(Math.random() * 256);
                      return "rgb(" + x + "," + y + "," + z + ")";
                    }),
                    borderWidth: 2,
                    borderRadius: 5,
                    borderSkipped: false,
                  },
                ],
              }}
            />
          </div>
        )}

        <div>
          {checks === null ? null : checks.map((obj) => <Check check={obj} />)}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;

import React from "react";

import useInterval from "../../utils/hoo/useInterval";
import { useNavigate } from "react-router-dom";

import styles from "./Timer.module.scss";
import { useDispatch, useSelector } from "react-redux";

const Timer = () => {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.selfCheckouts.time);
  const navigate = useNavigate();
  const [timer, setTimer] = React.useState(300000 - (Date.now() - time));

  React.useState(() => {
    setTimer(300000 - (Date.now() - time));
    // console.log("1!1");
  }, [time]);

  useInterval(() => {
    setTimer(timer - 1000);
  }, 1000);

  if (Date.now() - localStorage.getItem("time") > 300000) {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className={styles.timer}>{Math.ceil(timer / 60000)} minute left</div>
  );
};

export default Timer;

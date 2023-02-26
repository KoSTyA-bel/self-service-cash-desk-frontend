import styles from "./Timer.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [deadline, setDeadline] = useState(
    Number(localStorage.getItem("time"))
  );

  const getTime = () => {
    const time = deadline - Date.now();

    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
    setDeadline(Number(localStorage.getItem("time")));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    if (deadline - Date.now() <= 0) {
      console.log("ASHJKLASFUAKHFJS");
      localStorage.removeItem("time");
      localStorage.removeItem("selfCheckoutId");
      localStorage.removeItem("guid");
      navigate("/");
    }

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className={styles.timer}>
      {minutes}:{seconds >= 10 ? seconds : "0" + seconds}
    </div>
  );
};

export default Timer;

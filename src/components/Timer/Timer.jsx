import styles from "./Timer.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import time from "../../assets/img/time.svg";

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
      localStorage.removeItem("time");
      localStorage.removeItem("selfCheckoutId");
      localStorage.removeItem("guid");
      navigate("/");
    }

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div>
      {minutes === 0 && seconds === 0 ? (
        <img width={30} height={30} src={time} alt="Time" />
      ) : (
        <div className={styles.timer}>
          {minutes}:{seconds >= 10 ? seconds : "0" + seconds}
        </div>
      )}
    </div>
  );
};

export default Timer;

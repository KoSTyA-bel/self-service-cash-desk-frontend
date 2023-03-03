import React, { useState } from "react";
import {
  BsClockHistory,
  BsFillDoorOpenFill,
  BsFillPencilFill,
  BsDoorClosedFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

const Header = () => {
  const [isAdmin, setIsAdmin] = React.useState(
    localStorage.getItem("jwt") !== null
  );

  const onClickLogout = () => {
    localStorage.removeItem("jwt");
    setIsAdmin(false);
  };

  return (
    <header className={styles.header}>
      <Link to="history">
        <button>
          <BsClockHistory className={styles.img} />
        </button>
      </Link>
      {isAdmin ? (
        <div>
          <Link to="admin">
            <button>
              <BsFillPencilFill className={styles.img} />
            </button>
          </Link>
          <button onClick={() => onClickLogout()}>
            <BsFillDoorOpenFill className={styles.img} />
          </button>
        </div>
      ) : (
        <div>
          <Link to="auth">
            <button>
              <BsDoorClosedFill className={styles.img} />
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

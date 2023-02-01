import React from "react";

import styles from "./Header.module.scss";

const Header = () => {
  const isAdmin = true;

  return (
    <header className={styles.header}>
      {isAdmin ? <button className={styles.button}>Create</button> : null}
    </header>
  );
};

export default Header;

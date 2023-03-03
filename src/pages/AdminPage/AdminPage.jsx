import React from "react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

import styles from "./AdminPage.module.scss";

const AdminPage = () => {
  return (
    <div className={styles.admin}>
      <header>
        <Link to="/">
          <button>
            <AiFillHome className={styles.home} />
          </button>
        </Link>
      </header>
      <div className={styles.buttons}>
        <Link to="/admin/selfCheckouts">
          <button>Self checkout</button>
        </Link>
        <Link to="/admin/products">
          <button>Products</button>
        </Link>
        <Link to="/admin/cards">
          <button>Cards</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;

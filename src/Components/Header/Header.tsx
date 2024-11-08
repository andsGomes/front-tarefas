import React from "react";

import Logo from "../../assets/img/Logo.svg";

import styles from "./Header.module.css";

export const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.divImg}>
            <img src={Logo} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

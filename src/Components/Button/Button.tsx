import React from "react";

import styles from "./button.module.css";
import { IBoxProps, IIButtonProps } from "../../Models";
export const Button = ({children,...props}: IIButtonProps) => {
  return (
    <div className={styles.buttonCriarDiv}>
      <button className={styles.buttonCriar} {...props}>{children}</button>
    </div>
  );
};

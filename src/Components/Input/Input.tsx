import React from "react";

import styles from "./Input.module.css";
import { IInputProps } from "../../Models";

export const Input = ({ label, id, ...props }: IInputProps) => {
  return (
    <>
      <div className={styles.inputs}>
        <label htmlFor={id}>{label}</label>
        <input
          type="text"
          id={id}
          {...props}
          placeholder=" Adicione uma nova tarefa"
        />
      </div>
    </>
  );
};

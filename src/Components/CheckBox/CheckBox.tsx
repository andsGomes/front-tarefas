import styles from "./CheckBox.module.css";
import { ICheckedProps } from "../../Models";

export const CheckBox = ({
  label,
  id,
  check,
  onChange,
  ...props
}: ICheckedProps) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox}
        onChange={onChange}
        checked={check}
      />
      <label
        htmlFor={id}
        className={styles.checkboxlabel}
        style={{
          textDecoration: check ? "line-through" : "none",
          color: check ? "var(--gray-300)" : "",
        }}
      >
        <span>{label}</span>
      </label>
    </div>
  );
};

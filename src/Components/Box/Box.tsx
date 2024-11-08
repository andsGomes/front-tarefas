import React from "react";

import styles from "./Box.module.css";
import CheckBox from "../CheckBox";
import DeleteButton from "../Delete";
import { IBoxProps } from "../../Models";

export const Box = ({ id, title, status, deletedAt, onCompleteTarefa, onRemoveTarafa }: IBoxProps) => {
 
  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  React.useEffect(()=>{
    const result = handleChecked(deletedAt);
    setIsChecked(result);
  },[deletedAt])

  const handleChecked = (deletedAt : Date | null):boolean => {
    if (deletedAt === undefined) return false;
    else if (deletedAt === null) return false;
    else return true;
  };
  
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    if (onCompleteTarefa) {
       onCompleteTarefa(id, isChecked);
    }
  };

  const handleRemovetarefas = () => {
    if (onRemoveTarafa) onRemoveTarafa(id);
  }
  
  return (
    <div className={`${styles.box} not-found`}>
      <div className={styles.boxtexto}>
        <CheckBox
          label={title}
          id={id}
          check={isChecked}
          onChange={handleChange}
        />
        <DeleteButton onClick={handleRemovetarefas}/>
      </div>
    </div>
  );
};

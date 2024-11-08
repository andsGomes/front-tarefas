import React from 'react'

import ClipBoard from "../../assets/img/Clipboard.svg";
import styles from "./NotFound.module.css"; 

export const NotFound = () => {
  return (
    <div className={styles.sectionStyle}>
        <div className={styles.notStyles}>
            <img src={ClipBoard} alt="" />
            <div className={styles.pStyles}>
                <p>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
        </div>
    </div>
  )
}

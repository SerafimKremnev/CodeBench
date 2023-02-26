import { useState } from "react";
import styles from "./Boilerplate.module.css";

function Boilerplate() {
  const [code, setCode] = useState("");

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.text}>
        Как запустить функцию? Например: foo(1,2,3)
      </h3>
      <input
        type='text'
        className={styles.input}
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
    </div>
  );
}

export default Boilerplate;

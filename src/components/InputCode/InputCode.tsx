import {useCallback, useEffect, useState} from "react";
import styles from "./InputCode.module.css";
import { worker_script } from "../../worker";
import { IResults } from "../App/App";

interface ICodeBlock {
  name: string;
  time: number;
  index: number;
  setResults: (item: any) => void;
}

function CodeBlock({ name, setResults, index }: ICodeBlock) {
  const [code, setCode] = useState("for (let i = 0; i < 10000000; i++);");
  const [codeName, setCodeName] = useState(name);
  const [isFocuse, setIsFocuse] = useState(false);
  const [resultTime, setResultTime] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [myWorker, setMyWorker] = useState<Worker>();

  useEffect(() => {
    setMyWorker(new Worker(worker_script));
  }, [])

  const bench = (isTerminate?: boolean) => {
    setIsLoading(true);
    setErrorMessage("");
    // const myWorkerObj = new Worker(worker_script);
    if (!myWorker) return;
    console.log(myWorker);

    if (isTerminate) {
      setIsLoading(false);
      setErrorMessage("Прервано");
      myWorker.terminate();
      setMyWorker(new Worker(worker_script));
      return;
    }

    myWorker.postMessage(code);
    // myWorker.postMessage(code, [code]);

    myWorker.onmessage = (m) => {
      setResultTime(m.data);
      setResults((prevState: IResults[]) =>
        prevState.map((item) =>
          item.name === codeName ? { ...item, time: m.data } : item
        )
      );

      setIsLoading(false);
      //   myWorker.terminate();
    };
    myWorker.onerror = (event) => {
      //   myWorker.terminate();
      setErrorMessage(event.message);
      setIsLoading(false);
    };
  };

  return (
    <div className={styles.wrapper}>
      {isFocuse ? (
        <input
          className={styles.nameInput}
          type='text'
          value={codeName}
          onChange={(e) => {
            setCodeName(e.target.value);
          }}
          onBlur={() => {
            if (!codeName) setCodeName("Имя решения");
            setIsFocuse(false);
          }}
          autoFocus
        />
      ) : (
        <p
          className={styles.nameText}
          onClick={() => {
            setIsFocuse(true);
          }}
        >
          {codeName}
        </p>
      )}

      <textarea
        className={styles.input}
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <div className={styles.result}>
        {errorMessage ? (
          <p className={styles.error}>{errorMessage}</p>
        ) : (
          <p className={styles.resultText}>
            Время выполнения:
            {loading ? "Выполняется" : `${resultTime}  ms`}
          </p>
        )}

        {loading ? (
          <button
            type='button'
            className={styles.resultButton}
            onClick={(e) => {
              e.preventDefault();

              bench(true);
              //   setIsLoading(false);
              //   setErrorMessage("Прервано");
            }}
          >
            Прервать
          </button>
        ) : (
          <button
            type='button'
            id={name}
            className={styles.resultButton}
            onClick={(e) => {
              e.preventDefault();
              bench();
            }}
          >
            Выполнить отдельно
          </button>
        )}
        <button className={styles.deleteButton} type='button'>
          Удалить поле
        </button>
      </div>
    </div>
  );
}

export default CodeBlock;

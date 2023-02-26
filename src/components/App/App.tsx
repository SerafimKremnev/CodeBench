import Boilerplate from "../Boilerplate/Boilerplate";
import CodeBlock from "../InputCode/InputCode";
import styles from "./App.module.css";
import { useState } from "react";
import Results from "../Results/Results";
import Inputs from "../../test";

export interface IResults {
  name: string;
  time: number;
}
function App() {
  const [results, setResults] = useState<IResults[]>([
    { name: "Имя решения 1", time: 0 },
    { name: "Имя решения 2", time: 0 },
  ]);

  return (
    <div className={styles.wrapper}>
      <Boilerplate />

      <h3 className={styles.title}>Введите ваше решение в поле</h3>
      <span className={styles.subtitle}>
        Каждый блок кода выполняется 1000 раз для усреднения значений
      </span>
      <form
        className={styles.inputs}
        onSubmit={(e) => {
          e.preventDefault();
          //   const data = new FormData(e.currentTarget);

          //   console.log(data.get("start_bench"));
        }}
      >
        {results.map((codeBlock, index) => {
          return (
            <CodeBlock
              key={codeBlock.name + index}
              name={codeBlock.name}
              time={codeBlock.time}
              setResults={setResults}
              index={index}
            />
          );
        })}
        <div className={styles.buttonsWrapper}>
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setResults((prev: IResults[]) => {
                return [
                  ...prev,
                  { name: `Имя решения ${results.length + 1}`, time: 0 },
                ];
              });
            }}
          >
            Добавить поле
          </button>
          <button
            type='submit'
            onClick={() => {
              for (let i = 0; i < results.length; i++) {
                let item = results[i].name;
                const button = document.getElementById(`${item}`);
                button?.click();
              }
            }}
          >
            Запустить все тесты
          </button>
        </div>
      </form>

      <Results results={results} />
      <Inputs />
    </div>
  );
}

export default App;

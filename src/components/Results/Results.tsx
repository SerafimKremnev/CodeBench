import styles from "./Results.module.css";
import { IResults } from "../App/App";

function Results({ results }: any) {
  return (
    <div>
      <p className={styles.text}>Результаты выполнения:</p>
      {results.map((result: IResults) => {
        return (
          !!result.time && (
            <p key={result.name} className={styles.result}>
              name: {result.name} time: {result.time}
            </p>
          )
        );
      })}
    </div>
  );
}

export default Results;

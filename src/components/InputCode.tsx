import { useEffect, useState } from "react";
import { worker_script } from "../worker";
import { IResults } from "./App/App";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, TextField, Box } from "@mui/material";
import Editor from "@monaco-editor/react";

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
  }, []);

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
  // .wrapper {
  //   width: 49%;
  //   margin-bottom: 10px;
  // }
  return (
    <Box sx={{ width: "49%", mb: 2 }}>
      {isFocuse ? (
        <TextField
          id='standard-basic'
          label='Имя поля'
          value={codeName}
          sx={{ input: { color: "#fff" } }}
          onChange={(e) => {
            setCodeName(e.target.value);
          }}
          onBlur={() => {
            if (!codeName) setCodeName("Имя решения");
            setIsFocuse(false);
          }}
          autoFocus
          variant='standard'
          size='small'
        />
      ) : (
        <Button
          onClick={() => {
            setIsFocuse(true);
          }}
          size='large'
        >
          {codeName}
        </Button>
      )}
      <Editor
        height='300px'
        defaultLanguage='javascript'
        defaultValue='// some comment'
        value={code}
        options={{ tabSize: 2, fontSize: 15 }}
        onChange={(value) => {
          setCode(value || "");
        }}
        theme='vs-dark'
      />

      {/* <textarea
        className={styles.input}
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      /> */}
      <Box>
        <Box sx={{ mb: 1 }}>
          {errorMessage ? (
            <Typography
              variant='subtitle1'
              component='p'
              color='error'
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Typography>
          ) : (
            <Typography
              variant='subtitle1'
              component='p'
              color='primary'
              sx={{ mr: 1 }}
            >
              Время выполнения:
              {loading ? (
                <CircularProgress sx={{ ml: 1 }} size={15} />
              ) : (
                ` ${resultTime}  ms`
              )}
            </Typography>
          )}
        </Box>

        {loading ? (
          <Button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              bench(true);
            }}
            size='small'
            variant='contained'
            endIcon={<DeleteIcon fontSize='small' />}
            color='error'
          >
            Прервать
          </Button>
        ) : (
          <Button
            id={name}
            onClick={(e) => {
              e.preventDefault();
              bench();
            }}
            variant='contained'
            size='small'
            endIcon={<SendIcon fontSize='small' />}
          >
            Выполнить отдельно
          </Button>
        )}
        <Button
          sx={{ ml: 1 }}
          onClick={(e) => {
            e.preventDefault();
            bench(true);
          }}
          size='small'
          variant='outlined'
          endIcon={<DeleteIcon fontSize='small' />}
          color='error'
        >
          Удалить поле
        </Button>
      </Box>
    </Box>
  );
}

export default CodeBlock;

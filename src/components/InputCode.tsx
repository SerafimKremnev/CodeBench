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
  results: IResults[];
  setResults: (item: any) => void;
}

function CodeBlock({ name, setResults, index, results }: ICodeBlock) {
  const [code, setCode] = useState("for (let i = 0; i < 10000000; i++);");
  const [codeName, setCodeName] = useState(name);
  const [resultTime, setResultTime] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [myWorker, setMyWorker] = useState<Worker>();

  useEffect(() => {
    setMyWorker(new Worker(worker_script));
    return () => {
      myWorker?.terminate();
    };
  }, []);

  const bench = (isTerminate?: boolean) => {
    setIsLoading(true);
    setErrorMessage("");

    if (!myWorker) return;

    if (isTerminate) {
      setIsLoading(false);
      setErrorMessage("Прервано");
      myWorker.terminate();
      setMyWorker(new Worker(worker_script));
      return;
    }

    myWorker.postMessage(code);

    myWorker.onmessage = (m) => {
      setResultTime(m.data);
      setResults((prevState: IResults[]) =>
        prevState.map((item) =>
          item.name === codeName ? { ...item, time: m.data } : item
        )
      );

      setIsLoading(false);
    };
    myWorker.onerror = (event) => {
      setErrorMessage(event.message);
      setIsLoading(false);
    };
  };

  const deleteField = () => {
    const copyResults = [...results];
    copyResults.splice(index, 1);

    setResults(copyResults);
  };

  return (
    <Box sx={{ width: "49%", mb: 2 }}>
      <TextField
        value={codeName}
        sx={{
          input: { color: "#fff" },
          mb: 1,
        }}
        onChange={(e) => {
          setCodeName(e.target.value);
        }}
        onBlur={() => {
          if (!codeName) setCodeName("Имя решения");
        }}
        size='small'
        id='outlined-basic'
        label='Имя поля'
        variant='outlined'
        focused
      />

      <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Editor
          height='300px'
          defaultLanguage='javascript'
          defaultValue='// code here'
          value={code}
          options={{
            tabSize: 2,
            fontSize: 15,
            minimap: {
              enabled: false,
            },
          }}
          onChange={(value) => {
            setCode(value || "");
          }}
          theme='vs-dark'
        />
      </Box>

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
            deleteField();
          }}
          size='small'
          variant='contained'
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

import { useEffect, useState } from "react";
import { worker_script } from "../../worker";
import { Send, Delete, ExpandMore } from "@mui/icons-material";
import {
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import BenchState from "../../store/BenchState";
import EditorWindow from "../EditorWindow";
import NameState from "../../store/NameState";

interface ICodeBlock {
  name: string;
  index: number;
}

const CodeBlock = observer(({ name, index }: ICodeBlock) => {
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
      BenchState.setScore(index, m.data);
      // BenchState.renameField(index, codeName); TODO
      setIsLoading(false);
    };
    myWorker.onerror = (event) => {
      setErrorMessage(event.message);
      setIsLoading(false);
    };
  };

  return (
    <Box p={2} bgcolor={'#333'} display={'grid'}>
      <TextField
        value={codeName}
        sx={{
          input: { color: "#fff" },
          mb: 1,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          setCodeName(e.target.value);
          NameState.rename(index, e.target.value)
        }}
        onBlur={() => {
          if (!codeName) {
            setCodeName("Имя решения");
            NameState.rename(index, "Имя решения")
          }
        }}
        size='small'
        id='outlined-basic'
        label='Имя поля'
        variant='outlined'
        focused
      />
      <EditorWindow height={200} code={code} setCode={setCode} />
      <Box >
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
                {loading ? (
                  <CircularProgress sx={{ ml: 1 }} size={15} />
                ) : (
                  ` ${resultTime}  раз выполнился скрипт за одну секунду`
                )}
              </Typography>
            )}
          </Box>
            <Box display={'flex'} gap={2} flexWrap={'wrap'}>
            {loading ? (
              <Button
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  bench(true);
                }}
                size='small'
                variant='contained'
                endIcon={<Delete fontSize='small' />}
                color='error'
              >
                Прервать
              </Button>
            ) : (
              <Button
                id={NameState.benches[index]}
                onClick={(e) => {
                  e.preventDefault();
                  bench();
                }}
                variant='contained'
                size='small'
                endIcon={<Send fontSize='small' />}
              >
                Выполнить отдельно

              </Button>
            )}
            <Button
              onClick={(e) => {
                e.preventDefault();
                BenchState.deleteField(index);
                NameState.deleteName(index)
              }}
              size='small'
              variant='contained'
              endIcon={<Delete fontSize='small' />}
              color='error'
            >
              Удалить поле
            </Button>
          </Box>
        </Box>
    </Box>
  );
});

export default CodeBlock;

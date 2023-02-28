import { useEffect, useState } from "react";
import { worker_script } from "../../worker";
import { Send, Delete, ExpandMore } from "@mui/icons-material";
import {
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import BenchState from "../../store/BenchState";
import EditorWindow from "../EditorWindow";

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

      setIsLoading(false);
    };
    myWorker.onerror = (event) => {
      setErrorMessage(event.message);
      setIsLoading(false);
    };
  };

  return (
    <Box sx={{ width: "49%", mb: 2 }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{ backgroundColor: "#333 !important" }}
        >
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
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: "#333" }}>
          <EditorWindow code={code} setCode={setCode} />

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
                endIcon={<Delete fontSize='small' />}
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
                endIcon={<Send fontSize='small' />}
              >
                Выполнить отдельно
              </Button>
            )}
            <Button
              sx={{ ml: 1 }}
              onClick={(e) => {
                e.preventDefault();
                BenchState.deleteField(index);
              }}
              size='small'
              variant='contained'
              endIcon={<Delete fontSize='small' />}
              color='error'
            >
              Удалить поле
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});

export default CodeBlock;

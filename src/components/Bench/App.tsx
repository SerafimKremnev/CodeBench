import Boilerplate from "./Boilerplate";
import CodeBlock from "./CodeBlock";
import Results from "./Results";
import { observer } from "mobx-react-lite";
import BenchState from "../../store/BenchState";
import { Box, Typography, Button } from "@mui/material";
import { Send, AddCircleSharp } from "@mui/icons-material";

const App = observer(() => {
  return (
    <Box>
      <Boilerplate />

      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant='h5' component='h3'>
            Введите ваше решение в поле
          </Typography>
        </Box>
        <Box>
          <Button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              BenchState.addField();
            }}
            variant='contained'
            size='small'
            endIcon={<AddCircleSharp fontSize='small' />}
            sx={{ mr: 2 }}
          >
            Добавить поле
          </Button>
          <Button
            type='button'
            onClick={() => {
              for (let i = 0; i < BenchState.getFields().length; i++) {
                let item = BenchState.getFields()[i].name;
                const button = document.getElementById(`${item}`);
                button?.click();
              }
            }}
            variant='contained'
            size='small'
            endIcon={<Send fontSize='small' />}
          >
            Запустить все тесты
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {BenchState.benches.map((codeBlock, index) => {
          return (
            <CodeBlock
              key={codeBlock.name + index}
              name={codeBlock.name}
              index={index}
            />
          );
        })}
      </Box>

      <Results />
    </Box>
  );
});

export default App;

import { observer } from "mobx-react-lite";
import BenchState from "../../store/BenchState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function createData(name: string, score: number) {
  return { name, score };
}

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

const Results = observer(() => {
  return (
    <Paper sx={{ backgroundColor: "#1c1c1c" }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#fff" }}>Имя поля</TableCell>
            <TableCell sx={{ color: "#fff" }} align='right'>
              Результат
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {BenchState.getFields().map((result) => (
            <TableRow
              key={result.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row' sx={{ color: "#fff" }}>
                {result.name}
              </TableCell>
              <TableCell sx={{ color: "#fff" }} align='right'>
                {result.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
});
export default Results;

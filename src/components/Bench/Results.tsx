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
import {DetailedHTMLProps, HTMLAttributes} from "react";
import NameState from "../../store/NameState";

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

interface ResultsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}
const Results = observer(({className}:ResultsProps) => {
  return (
    <Paper className={className} sx={{ backgroundColor: "#1c1c1c", mt: '30px', maxHeight: '78vh', overflow: 'auto' }}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#fff" }}>Имя поля</TableCell>
            <TableCell sx={{ color: "#fff" }} align='right'>
              Результат
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {BenchState.getFields().map((result, index) => (
            <TableRow
              key={result.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row' sx={{ color: "#fff" }}>
                {NameState.benches[index]}
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

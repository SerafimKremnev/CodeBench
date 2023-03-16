import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import BenchState from "../../../../store/BenchState";
import CodeBlock from "../../CodeBlock";
import {Box} from "@mui/material";
import {observer} from "mobx-react-lite";

interface BodyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}
const Body = observer(({className}: BodyProps) => {
    return (
        <Box className={className}>
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
    );
});

export default Body;
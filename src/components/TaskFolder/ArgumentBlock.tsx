import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import Arguments from "./Arguments";

export interface IArgs {
    args: string,
    expected: string
    id: number
}

interface ArgumentBlockProps {
    tests: IArgs[],
    setTests: (tests: IArgs[]) => void
}


const ArgumentBlock = ({tests, setTests}: ArgumentBlockProps) => {
    const [counter, setCounter] = useState<JSX.Element[]>(new Array(1).fill(<></>))

    return (
        <>
            <Box display={'flex'} justifyContent={"space-between"} alignItems={'center'} gap={'20px'}>
                <Typography fontSize={'12px'}  color={'white'}>Аргументы для тестов:</Typography>
                <Add onClick={() => setCounter([...counter, <></>])}/>
            </Box>
            <Box padding={'20px 20px 20px 0'} overflow={'auto'} display={'grid'} gap={'10px'} maxHeight={'150px'}>
                {counter.map(e => <Arguments tests={tests} setTests={setTests}/>)}
            </Box>
        </>
    )
};

export default ArgumentBlock;
import React, {useEffect, useState} from 'react';
import {Box, TextField} from "@mui/material";
import {IArgs} from "./ArgumentBlock";

interface ArgumentsProps {
    setTests: (value: IArgs[]) => void,
    tests: IArgs[]
}

const Arguments = ({setTests, tests}: ArgumentsProps) => {
    const [id, setId] = useState(Date.now);
    const [argument, setArgument] = useState<string>('');
    const [expected, setExpected] = useState<string>('');
    useEffect(() => {
        if(tests) {
            setTests(tests.map(test => id == test.id ? {id: id, args: argument, expected: expected} : test))
        } else {
            setTests([{id: id, args: argument, expected: expected}])
        }
    }, [argument, expected])

    useEffect(() => {
        if(tests) {
            setTests([...tests, {id: id, args: argument, expected: expected}])
        }
    }, [])

    return (
        <Box display={'grid'} gridTemplateColumns={'2fr 1fr'} gap={'20px'}>
            <TextField size={'small'} value={argument} onChange={(e) => setArgument(e.target.value)} type={'text'} sx={{input: {color:'#fff'}}} focused label={'Аргументы'} variant={'outlined'}/>
            <TextField size={'small'} value={expected} onChange={(e) => setExpected(e.target.value)} type={'text'} sx={{input: {color:'#fff'}}} focused label={'Ожидание'} variant={'outlined'}/>
        </Box>
    );
};

export default Arguments;
import React from 'react';
import styles from './Header.module.css'
import {Box, Typography} from "@mui/material";

const Header = () => {

    return (
        <Box display={'flex'}>
            <Typography fontWeight={300} fontSize={'25px'} color={'white'}>
                Code
            </Typography>
            <Typography fontWeight={600} fontSize={'25px'} color={'primary'}>
                Bench
            </Typography>
        </Box>
    );
};

export default Header;
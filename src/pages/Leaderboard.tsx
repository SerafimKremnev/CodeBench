import React from 'react';
import LeaderboardComponent from "../components/TaskFolder/LeaderboardComponent";
import UserState from "../store/UserState";
import {Typography} from "@mui/material";

const Leaderboard = () => {
    if(UserState.token) {
        return (
            <LeaderboardComponent/>
        );
    } else {
        return <Typography textAlign={'center'} color={'#444'} mt={2} fontWeight={700} fontSize={28}>Сначала зарегестрируйтесь</Typography>
    }

};

export default Leaderboard;
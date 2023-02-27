import React from 'react';
import Task from "../Task/Task";

const TaskList = (): JSX.Element => {
    const testArr: JSX.Element[] = new Array(4).fill(<></>)
    return (
        <>
            {testArr.map(e => <Task/>)}
        </>
    )

};

export default TaskList;
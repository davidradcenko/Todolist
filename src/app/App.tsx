import React from "react";
import IconButton from '@mui/material/IconButton';
import {Button, Container, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";

import {TaskType} from "../api/TodoLists-api"
import TodolistsList from "../features/TodolistsList/TodolistsList";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    );
}


export default App;

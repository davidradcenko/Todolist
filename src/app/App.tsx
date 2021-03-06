import React from "react";
import IconButton from '@mui/material/IconButton';
import {Button, Container, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";

import {TaskType} from "../api/TodoLists-api"
import TodolistsList from "../features/TodolistsList/TodolistsList";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../features/Login/Login";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type PropsType ={
    demo?: boolean
}
const App = ({demo=false}: PropsType) => {
const  status = useSelector<RootState, RequestStatusType>((state)=>state.app.status)
    return (
        <BrowserRouter>
        <div className="App">
            <ErrorSnackbar/>
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
                { status === 'loading' &&  <LinearProgress/> }
            </AppBar>
            <Container fixed>
                <Route exact path={"/"} render={()=> <TodolistsList demo={demo} />} />
                <Route path={"/login"} render={()=> <Login/>}  />
            </Container>

        </div>
        </BrowserRouter>
    );
}


export default App;
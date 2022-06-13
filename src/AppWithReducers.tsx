import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import IconButton from '@mui/material/IconButton';
import {Button, Container, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FiltorValeosType = "all" | "completed" | "active";
export type TodolistType = {
    id: string,
    title: string,
    filter: FiltorValeosType

}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {


    let todolistId1 = v1();
    let todolistID2 = v1();
    let [todolist, dispatchToDolistReducer] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistID2, title: "What to buy", filter: "completed"}
    ])
    let [tasksOdj, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "Css", isDone: true},
            {id: v1(), title: "Js", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    })
    function RemoveTasks(id: string, todolistId: string) {
        const action= removeTaskAC(id,todolistId)
        dispatchToTasksReducer(action)
    }
    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title,todolistId)
        dispatchToTasksReducer(action)
    }
    function ChengeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action=changeTaskStatusAC(taskId,isDone,todolistId)
        dispatchToTasksReducer(action)
        // let tasks = tasksOdj[todolistId];
        // let task = tasks.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks({...tasksOdj})
        // }
    }
    function ChengeStatusTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId,newTitle,todolistId))
    }

    function chengeTodolistTitle(id: string, newTitle: string) {
        const action=changeTodolistTitleAC(id,newTitle)
        dispatchToDolistReducer(action)
    }

    function changeFilter(value: FiltorValeosType, todolistId: string) {
        const action=changeTodolistFilterAC(todolistId,value)
        dispatchToDolistReducer(action)
    }

    let removeTodolist = (id: string) => {
        const action=removeTodolistAC(id)
        dispatchToTasksReducer(action)
        dispatchToDolistReducer(action)
    }

    function addTodoList(title: string) {
        const action=addTodolistAC(title)
        dispatchToTasksReducer(action)
        dispatchToDolistReducer(action)
    }

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
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>

                    {
                        todolist.map(t => {
                            let taskForTodolist = tasksOdj[t.id];
                            if (t.filter === "completed") {
                                taskForTodolist = taskForTodolist.filter(t => t.isDone === true);
                            }
                            if (t.filter === "active") {
                                taskForTodolist = taskForTodolist.filter(t => t.isDone === false);
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={t.id}
                                        id={t.id}
                                        title={t.title}
                                        tasks={taskForTodolist}
                                        RemoveTasks={RemoveTasks}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        ChengeTaskTitle={ChengeStatusTitle}
                                        ChengeTaskStatus={ChengeStatus}
                                        filter={t.filter}
                                        removeTodolist={removeTodolist}
                                        chengeTodolistTitle={chengeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers;

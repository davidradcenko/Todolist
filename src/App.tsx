import React, {useState} from 'react';
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

export type FiltorValeosType = "all" | "completed" | "active";
export type TodolistType = {
    id: string,
    title: string,
    filter: FiltorValeosType

}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    function ChengeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksOdj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksOdj})
        }
    }

    function ChengeStatusTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksOdj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksOdj})
        }
    }

    function RemoveTasks(id: string, todolistId: string) {
        let tasks = tasksOdj[todolistId];
        let filterTasks = tasks.filter(t => t.id !== id)
        tasksOdj[todolistId] = filterTasks
        setTasks({...tasksOdj})
    }

    function chengeTodolistTitle(id: string, newTitle: string) {
        let todolistsForID = todolist.find(tl => tl.id === id);
        if (todolistsForID) {
            todolistsForID.title = newTitle;
            setTodolist([...todolist])
        }
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksOdj[todolistId];
        let newTasks = [newTask, ...tasks]
        tasksOdj[todolistId] = newTasks;
        setTasks({...tasksOdj})
    }

    function changeFilter(value: FiltorValeosType, todolistId: string) {
        let todolists = todolist.find(t => t.id === todolistId)
        if (todolists) {
            todolists.filter = value
            setTodolist([...todolist])
        }
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolist.filter(t => t.id !== todolistId)
        setTodolist(filteredTodolist)
        delete tasksOdj[todolistId]
        setTasks({...tasksOdj})
    }


    let todolistId1 = v1();
    let todolistID2 = v1();
    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistID2, title: "What to buy", filter: "completed"}
    ])
    let [tasksOdj, setTasks] = useState<TasksStateType>({
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

    function addTodoList(title: string) {
        let todolists: TodolistType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodolist([todolists, ...todolist])
        setTasks({...tasksOdj, [todolists.id]: []})
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

export default App;

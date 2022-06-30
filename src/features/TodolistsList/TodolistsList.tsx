import React, {useCallback,useEffect} from "react";
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import IconButton from '@mui/material/IconButton';
import {Button, Container, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useDispatch,useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {addTodolistAC,changeTodolistFilterAC,changeTodolistTitleAC,removeTodolistAC,
    FiltorValeosType,TodolistDomainType,setTodolistsAC,fetchTodolistsTC,removeTodolistsTC,addTodolistsTC,changeTodolistTitleTC} from "./todolists-reducer";
import {addTaskAC, removeTaskAC,removeTaskTC,addTaskTC,updateTaskTC} from "./tasks-reducer";
import {TaskType,TodolistType,TaskStatuses,todoListsAPI} from "../../api/TodoLists-api"
import App from "../../app/App";

const TodolistsList:React.FC = (props)=>{

    const dispatch= useDispatch()
    const todolist= useSelector<AppRootState, Array<TodolistDomainType>>(state=>state.todolist)

    useEffect(()=>{
        dispatch(fetchTodolistsTC())
    },[])
    const RemoveTasks= useCallback((id: string, todolistId: string)=> {
        const thunk= removeTaskTC(id,todolistId)
        dispatch(thunk)
    },[])
    const  addTask=useCallback((title: string, todolistId: string)=> {
        const thunk = addTaskTC(title,todolistId)
        dispatch(thunk)
    },[dispatch])
    const  ChengeStatus=useCallback((taskId: string, status: TaskStatuses, todolistId: string)=>  {
        const action=updateTaskTC(taskId,{status},todolistId)
        dispatch(action)

    },[dispatch])
    const  ChengeStatusTitle= useCallback((taskId: string, newTitle: string, todolistId: string)=> {
        const action=updateTaskTC(taskId,{title:newTitle},todolistId)
        dispatch(action)
    },[dispatch])
    const chengeTodolistTitle= useCallback( (id: string, newTitle: string)=> {
        const action=changeTodolistTitleTC(id,newTitle)
        dispatch(action)
    },[dispatch])
    const  changeFilter= useCallback((value: FiltorValeosType, todolistId: string)=> {
        const action=changeTodolistFilterAC(todolistId,value)
        dispatch(action)
    },[dispatch])
    const removeTodolist = useCallback((id: string) => {
        const thunk=removeTodolistsTC(id)
        dispatch(thunk)
    },[dispatch])
    const  addTodoList = useCallback((title: string)=> {
        const thunk=addTodolistsTC(title)
        dispatch(thunk)
    },[dispatch])
    return  (<>
        <Grid container style={{padding: "10px"}}>
    <AddItemForm addItem={addTodoList}/>
    </Grid>
    <Grid container spacing={3}>

        {
            todolist.map(t => {

                return <Grid item>
                <Paper key={""} style={{padding: "10px"}}>
                <Todolist
                    key={t.id}
                id={t.id}
                title={t.title}
                RemoveTasks={RemoveTasks}
                changeFilter={changeFilter}
                filter={t.filter}
                addTask={addTask}
                ChengeTitleTask={ChengeStatusTitle}
                ChengeStatusTask={ChengeStatus}
                removeTodolist={removeTodolist}
                chengeTodolistTitle={chengeTodolistTitle}
                />
                </Paper>
                </Grid>
            })
        }
        </Grid>
        </>)
}
export default TodolistsList;
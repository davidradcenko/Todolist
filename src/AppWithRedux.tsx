
import './App.css';
 import {Todolist, TaskType} from "./Todolist";
 import {AddItemForm} from "./AddItemForm";
 import IconButton from '@mui/material/IconButton';
 import {Button, Container, Toolbar, Typography} from "@mui/material";
 import {Menu} from "@mui/icons-material";
 import AppBar from "@mui/material/AppBar";
 import Grid from "@mui/material/Grid";
 import Paper from "@mui/material/Paper";
 import {useDispatch,useSelector} from "react-redux";
 import {AppRootState} from "./state/store";
 import {addTodolistAC,changeTodolistFilterAC,changeTodolistTitleAC,removeTodolistAC} from "./state/todolists-reducer";
 import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

 export type FiltorValeosType = "all" | "completed" | "active";
 export type TodolistType = {
     id: string,
     title: string,
     filter: FiltorValeosType

 }
 export type TasksStateType = {
     [key: string]: Array<TaskType>
 }

 function AppWithRedux() {


    const dispatch= useDispatch()
    const todolist= useSelector<AppRootState, Array<TodolistType>>(state=>state.todolist)



     function RemoveTasks(id: string, todolistId: string) {
         const action= removeTaskAC(id,todolistId)
         dispatch(action)
     }
     function addTask(title: string, todolistId: string) {
         const action = addTaskAC(title,todolistId)
         dispatch(action)
     }
     function ChengeStatus(taskId: string, isDone: boolean, todolistId: string) {
         const action=changeTaskStatusAC(taskId,isDone,todolistId)
         dispatch(action)

     }
     function ChengeStatusTitle(taskId: string, newTitle: string, todolistId: string) {
         dispatch(changeTaskTitleAC(taskId,newTitle,todolistId))
     }

     function chengeTodolistTitle(id: string, newTitle: string) {
         const action=changeTodolistTitleAC(id,newTitle)
         dispatch(action)
     }

     function changeFilter(value: FiltorValeosType, todolistId: string) {
         const action=changeTodolistFilterAC(todolistId,value)
         dispatch(action)
     }

     let removeTodolist = (id: string) => {
         const action=removeTodolistAC(id)
         dispatch(action)
         //dispatch(action)
     }

     const  addTodoList = useCallback((title: string)=> {
         const action=addTodolistAC(title)
         dispatch(action)
         //dispatch(action)
     },[])

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

                             return <Grid item>
                                 <Paper style={{padding: "10px"}}>
                                     <Todolist
                                         key={t.id}
                                         id={t.id}
                                         title={t.title}

                                         changeFilter={changeFilter}
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

 export default AppWithRedux;

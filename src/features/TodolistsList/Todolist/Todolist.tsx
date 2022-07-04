import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {fetchTasksTC} from "../tasks-reducer";
import {Task} from "./Task/Task";
import {FiltorValeosType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/TodoLists-api";
import {useAppDispatch} from "../../../app/hooks";


type PropsType = {
    id: string,
    title: string,
    changeFilter: (value: FiltorValeosType, todolistId: string) => void,
    removeTodolist: (todolistId: string) => void,
    chengeTodolistTitle: (id: string, newTitle: string) => void,
    filter: FiltorValeosType,
    RemoveTasks:(id: string, todolistId: string) => void,
    addTask:(title: string, todolistId: string)=>void,
    ChengeStatusTask:(taskId: string, status: TaskStatuses, todolistId: string)=> void,
    ChengeTitleTask:(taskId: string, newTitle: string, todolistId: string)=>void,
    demo?: boolean
}

export const Todolist = React.memo(function ({demo=false,...props}: PropsType) {


    const dispatch= useAppDispatch()

    useEffect(()=>{
        if(demo){
            return
        }
        dispatch(fetchTasksTC(props.id)  )
    },[])

    const tasks = useSelector<RootState, Array<TaskType>>(state => state.tasks[props.id])



    const addItem = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [dispatch, props.id])

    const onAllClickHander = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const onCompletedClickHander = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])
    const onActiveClickHander = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const ChengeTodolistTitle = useCallback((newtitle: string) => {
        props.chengeTodolistTitle(props.id, newtitle)
    }, [props.id, props.chengeTodolistTitle])


    let taskForTodolist = tasks;
    let allTodolistTasks = taskForTodolist
    if (props.filter === "completed") {
        taskForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
    }
    if (props.filter === "active") {
        taskForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
    }


    return (<div>
            <h3><EditableSpan title={props.title} onChange={ChengeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItem}/>
            <div>
                {taskForTodolist.map(t => <Task ChengeTitleTask={props.ChengeTitleTask} ChengeStatusTask={props.ChengeStatusTask} RemoveTasks={props.RemoveTasks} t={t} todolistID={props.id} key={t.id}/> )}
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHander}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHander}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHander}>Completed
                </Button>
            </div>
        </div>
    )
})


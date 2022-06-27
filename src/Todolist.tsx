import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, fetchTasksTC} from "./state/tasks-reducer";
import {Task} from "./Task";
import {fetchTodolistsTC, FiltorValeosType} from "./state/todolists-reducer";
import {TaskStatuses, TaskType} from "./api/TodoLists-api";
import {any} from "prop-types";


type PropsType = {
    id: string,
    title: string,
    changeFilter: (value: FiltorValeosType, todolistId: string) => void,
    removeTodolist: (todolistId: string) => void,
    chengeTodolistTitle: (id: string, newTitle: string) => void,
    filter: FiltorValeosType,
    RemoveTasks:(id: string, todolistId: string) => void,
    addTask:(title: string, todolistId: string)=>void
}

export const Todolist = React.memo(function (props: PropsType) {
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(fetchTasksTC(props.id))
    },[])

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])



    const addItem = useCallback((title: string) => {
        dispatch(props.addTask(title, props.id))
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
                {taskForTodolist.map(t => <Task RemoveTasks={props.RemoveTasks} t={t} todolistID={props.id} key={t.id}/> )}
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


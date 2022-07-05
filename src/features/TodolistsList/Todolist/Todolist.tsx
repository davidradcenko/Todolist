import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {fetchTasksTC} from "../tasks-reducer";
import {Task} from "./Task/Task";
import {FiltorValeosType, TodolistDomainType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/TodoLists-api";
import {useAppDispatch} from "../../../app/hooks";


type PropsType = {
    todolist:TodolistDomainType
    changeFilter: (value: FiltorValeosType, todolistId: string) => void,
    removeTodolist: (todolistId: string) => void,
    chengeTodolistTitle: (id: string, newTitle: string) => void,
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
        dispatch(fetchTasksTC(props.todolist.id)  )
    },[])

    const tasks = useSelector<RootState, Array<TaskType>>(state => state.tasks[props.todolist.id])



    const addItem = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [dispatch, props.todolist.id])

    const onAllClickHander = useCallback(() => props.changeFilter("all", props.todolist.id), [props.changeFilter, props.todolist.id])
    const onCompletedClickHander = useCallback(() => props.changeFilter("completed", props.todolist.id), [props.changeFilter, props.todolist.id])
    const onActiveClickHander = useCallback(() => props.changeFilter("active", props.todolist.id), [props.changeFilter, props.todolist.id])
    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const ChengeTodolistTitle = useCallback((newtitle: string) => {
        props.chengeTodolistTitle(props.todolist.id, newtitle)
    }, [props.todolist.id, props.chengeTodolistTitle])


    let taskForTodolist = tasks;
    let allTodolistTasks = taskForTodolist
    if (props.todolist.filter === "completed") {
        taskForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
    }
    if (props.todolist.filter === "active") {
        taskForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
    }


    return (<div>
            <h3><EditableSpan title={props.todolist.title} onChange={ChengeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItem} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {taskForTodolist.map(t => <Task ChengeTitleTask={props.ChengeTitleTask} ChengeStatusTask={props.ChengeStatusTask} RemoveTasks={props.RemoveTasks} t={t} todolistID={props.todolist.id} key={t.id}/> )}
            </div>
            <div>
                <Button variant={props.todolist.filter === "all" ? "contained" : "text"} onClick={onAllClickHander}>All</Button>
                <Button variant={props.todolist.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHander}>Active
                </Button>
                <Button variant={props.todolist.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHander}>Completed
                </Button>
            </div>
        </div>
    )
})


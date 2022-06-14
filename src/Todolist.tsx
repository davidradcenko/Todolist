import React, {ChangeEvent} from "react";
import {FiltorValeosType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskType = {
    id: string, title: string, isDone: boolean
}
type PropsType = {
    id: string,
    title: string,
    changeFilter: (value: FiltorValeosType, todolistId: string) => void,
    removeTodolist: (todolistId: string) => void,
    chengeTodolistTitle: (id: string, newTitle: string) => void,
    filter: FiltorValeosType
}

export function Todolist(props: PropsType) {

    const tasks= useSelector<AppRootState, Array<TaskType>>(state=>state.tasks[props.id])
    const dispatch=useDispatch()
    const onAllClickHander = () => props.changeFilter("all", props.id)
    const onCompletedClickHander = () => props.changeFilter("completed", props.id)
    const onActiveClickHander = () => props.changeFilter("active", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const ChengeTodolistTitle = (newtitle: string) => {
        props.chengeTodolistTitle(props.id, newtitle)
    }



    let taskForTodolist = tasks;
    let allTodolistTasks = taskForTodolist
    if (props.filter === "completed") {
        taskForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }
    if (props.filter === "active") {
        taskForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }


    return (<div>
            <h3><EditableSpan title={props.title} onChange={ChengeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={(title)=>{
                dispatch( addTaskAC(title,props.id))
            }}/>
            <div>
                {taskForTodolist.map(t => {
                    const onRevoveHander = () => dispatch( removeTaskAC(t.id, props.id))
                    const OnChencStatusHandle = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue=e.currentTarget.checked
                        dispatch(changeTaskStatusAC(t.id,newIsDoneValue, props.id))
                    }
                    const OnChencheTitleHandle = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id,newValue,props.id))
                    }
                    return <div className={t.isDone === true ? "is-done" : ""} key={t.id}>
                        <Checkbox onChange={OnChencStatusHandle} checked={t.isDone}/>
                        <EditableSpan onChange={OnChencheTitleHandle} title={t.title}/>
                        <IconButton aria-label="delete" onClick={onRevoveHander}>
                            <Delete/>
                        </IconButton>
                    </div>
                })}
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
}


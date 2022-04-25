import React, {ChangeEvent} from "react";
import {FiltorValeosType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string, title: string, isDone: boolean
}
type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    RemoveTasks: (id: string, todolistId: string) => void,
    changeFilter: (value: FiltorValeosType, todolistId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    ChengeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    ChengeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void,
    chengeTodolistTitle: (id: string, newTitle: string) => void,
    filter: FiltorValeosType,
    removeTodolist: (todolistId: string) => void,
}

export function Todolist(props: PropsType) {
    const onAllClickHander = () => props.changeFilter("all", props.id)
    const onCompletedClickHander = () => props.changeFilter("completed", props.id)
    const onActiveClickHander = () => props.changeFilter("active", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const ChengeTodolistTitle = (newtitle: string) => {
        props.chengeTodolistTitle(props.id, newtitle)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }
    return (<div>
            <h3><EditableSpan title={props.title} onChange={ChengeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map(t => {
                    const onRevoveHander = () => props.RemoveTasks(t.id, props.id)
                    const OnChencStatusHandle = (e: ChangeEvent<HTMLInputElement>) => {
                        props.ChengeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const OnChencheTitleHandle = (newValue: string) => {
                        props.ChengeTaskTitle(t.id, newValue, props.id)
                    }
                    return <div className={t.isDone == true ? "is-done" : ""} key={t.id}>
                        <Checkbox onChange={OnChencStatusHandle} checked={t.isDone}/>
                        <EditableSpan onChange={OnChencheTitleHandle} title={t.title}/>
                        <IconButton aria-label="delete" onClick={onRevoveHander}>
                            <Delete/>
                        </IconButton>
                    </div>
                })}
            </div>
            <div>
                <Button variant={props.filter == "all" ? "contained" : "text"} onClick={onAllClickHander}>All</Button>
                <Button variant={props.filter == "active" ? "contained" : "text"}
                        onClick={onActiveClickHander}>Active
                </Button>
                <Button variant={props.filter == "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHander}>Completed
                </Button>
            </div>
        </div>
    )
}


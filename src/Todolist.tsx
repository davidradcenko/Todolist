import React, {ChangeEvent} from "react";
import {FiltorValeosType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    const ChengeTodolistTitle = (newtitle:string) => {
        props.chengeTodolistTitle(props.id,newtitle)
    }
    const addTask = (title:string)=>{
        props.addTask(title,props.id);
    }
    return (<div>
            <h3> <EditableSpan title={props.title} onChenge={ChengeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm  addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    const onRevoveHander = () => props.RemoveTasks(t.id, props.id)
                    const OnChencStatusHandle = (e: ChangeEvent<HTMLInputElement>) => {
                        props.ChengeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const OnChencheTitleHandle = (newValue:string) => {
                        props.ChengeTaskTitle(t.id, newValue, props.id)
                    }
                    return <li className={t.isDone == true ? "is-done" : ""} key={t.id}><input type="checkbox"
                                                                                               onChange={OnChencStatusHandle}
                                                                                               checked={t.isDone}/>
                        <EditableSpan onChenge={OnChencheTitleHandle} title={t.title}/>
                        <button onClick={onRevoveHander}>X</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={props.filter == "all" ? "active-filter" : ""} onClick={onAllClickHander}>All</button>
                <button className={props.filter == "active" ? "active-filter" : ""}
                        onClick={onActiveClickHander}>Active
                </button>
                <button className={props.filter == "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHander}>Completed
                </button>
            </div>
        </div>
    )
}


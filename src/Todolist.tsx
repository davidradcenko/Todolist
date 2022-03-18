import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {futimes} from "fs";
import {FiltorValeosType} from "./App";

export type TaskType = {
    id: string, title: string, isDone: boolean
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    RemoveTasks: (id: string) => void,
    changeFilter: (value: FiltorValeosType) => void,
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitel, setnewTaskTitel] = useState("")

    const onNewTitleChengeHander = (e: ChangeEvent<HTMLInputElement>) => {
        setnewTaskTitel(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitel)
            setnewTaskTitel("")
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitel)
        setnewTaskTitel("")
    }

    const onAllClickHander = () => props.changeFilter("all")
    const onCompletedClickHander = () => props.changeFilter("completed")
    const onActiveClickHander = () => props.changeFilter("active")
    return (<div>
            <h3>{props.title} </h3>
            <div>
                <input value={newTaskTitel}
                       onChange={onNewTitleChengeHander}
                       onKeyPress={onKeyPress}
                       type="text"/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onRevoveHander = () => props.RemoveTasks(t.id)
                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRevoveHander}>X</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHander}>All</button>
                <button onClick={onActiveClickHander}>Active</button>
                <button onClick={onCompletedClickHander}>Completed</button>
            </div>
        </div>
    )
}
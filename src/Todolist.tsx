import React from "react";
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
    addTask: () => void
}

export function Todolist(props: PropsType) {
    return (<div>
            <h3>{props.title} </h3>
            <div>
                <input type="text"/>
                <button onClick={()=>{props.addTask()}}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.RemoveTasks(t.id)
                    }}>X
                    </button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}
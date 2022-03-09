import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";

export type FiltorValeosType= "all" | "completed" | "active";

function App() {
    let [tasks, setTasks] = useState< Array<TaskType>>([
        {id: 1, title: "Css", isDone: true},
        {id: 2, title: "Js", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])
    let [filter,setFilter] = useState<FiltorValeosType>("all")

    function changeFilter(value:FiltorValeosType) {
        setFilter(value);
    }
    function RemoveTasks(id: number) {
        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks)
    }

let taskForTodolist = tasks;
    if (filter === "completed"){
        taskForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active"){
        taskForTodolist = tasks.filter(t => t.isDone === false);
    }
    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={taskForTodolist}
                      RemoveTasks={RemoveTasks}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;

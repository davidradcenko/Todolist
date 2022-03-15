import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";
import {v1} from "uuid";

export type FiltorValeosType = "all" | "completed" | "active";

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "Css", isDone: true},
        {id: v1(), title: "Js", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])
    let [filter, setFilter] = useState<FiltorValeosType>("all")

    function changeFilter(value: FiltorValeosType) {
        setFilter(value);
    }

    function RemoveTasks(id: string) {
        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks)
    }

    function addTask() {
        let newTask = {id: v1(), title: "New Task", isDone: false};
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    let taskForTodolist = tasks;
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false);
    }
    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={taskForTodolist}
                      RemoveTasks={RemoveTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />

        </div>
    );
}

export default App;

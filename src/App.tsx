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

    function ChengeStatus(taskId: string, isDone:boolean) {
        let task = tasks.find(t => t.id === taskId)
        if(task){
            task.isDone = isDone
        }

        setTasks([...tasks])
    }

    function RemoveTasks(id: string) {
        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
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
                      ChengeTaskStatus={ChengeStatus}
                      filter={filter}
            />

        </div>
    );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {Todolist, TypeTask} from "./Todolist";


function App() {

    let initialTasks = [
        {id: 1, title: "Css", isDone: true},
        {id: 2, title: "Js", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]
   let arr= useState(initialTasks)
    let tasks =arr[0];
    let setTasks=arr[1]

    function RemoveTasks(id: number) {
       let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks)
    }


    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasks}
                      RemoveTasks={RemoveTasks}/>
        </div>
    );
}

export default App;

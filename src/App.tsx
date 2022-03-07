import React from 'react';
import './App.css';
import {Todolist, TypeTask} from "./Todolist";

let tasks1=[
    {id:1, title:"Css",isDone: true},
    {id:2, title:"Js",isDone: true},
    {id:3, title:"React",isDone: false},
]
let tasks2:Array<TypeTask>=[
    {id:1, title:"Termintol",isDone: true},
    {id:2, title:"XXX",isDone: false},
    {id:3, title:"Terminator",isDone: true},
    {id:4, title:"Terminator",isDone: true}
]

function App() {
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1}/>
            <Todolist title={"Movies"} tasks={tasks2}/>
        </div>
    );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FiltorValeosType = "all" | "completed" | "active";
type TodolistType = {
    id: string,
    title: string,
    filter: FiltorValeosType

}

function App() {
    function ChengeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksOdj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksOdj})
        }
    }

    function RemoveTasks(id: string, todolistId: string) {
        let tasks = tasksOdj[todolistId];
        let filterTasks = tasks.filter(t => t.id !== id)
        tasksOdj[todolistId] = filterTasks
        setTasks({...tasksOdj})
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksOdj[todolistId];
        let newTasks = [newTask, ...tasks]
        tasksOdj[todolistId] = newTasks;
        setTasks({...tasksOdj})
    }

    function changeFilter(value: FiltorValeosType, todolistId: string) {
        let todolists = todolist.find(t => t.id === todolistId)
        if (todolists) {
            todolists.filter = value
            setTodolist([...todolist])
        }
    }

    let removeTodolist = (todolistId:string)=>{
        let filteredTodolist=todolist.filter(t=> t.id!== todolistId)
        setTodolist(filteredTodolist)
        delete tasksOdj[todolistId]
        setTasks({...tasksOdj})
    }




    let todolistId1 = v1();
    let todolistID2 = v1();
    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistID2, title: "What to buy", filter: "completed"}
    ])
    let [tasksOdj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "Css", isDone: true},
            {id: v1(), title: "Js", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    })
    function addTodoList(title:string) {
        let todolists:TodolistType = {
            id:v1(),
            filter:"all",
            title:title
        }
        setTodolist([todolists,...todolist])
        setTasks({...tasksOdj, [todolists.id]:[]})
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            <input type="text"/> <input type="button"/>
            {
                todolist.map(t => {
                    let taskForTodolist = tasksOdj[t.id];
                    if (t.filter === "completed") {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone === true);
                    }
                    if (t.filter === "active") {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone === false);
                    }
                    return <Todolist
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        tasks={taskForTodolist}
                        RemoveTasks={RemoveTasks}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        ChengeTaskStatus={ChengeStatus}
                        filter={t.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }


        </div>
    );
}

export default App;

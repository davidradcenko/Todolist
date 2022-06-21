import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todoListsAPI} from "../api/TodoLists-api";

export default {
    title: 'API'
}
const setting = {
    headers: {
        "API-KEY": "865054b3-8839-41aa-aa3c-1dce403daa1b"
    },
    withCredentials: true
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [Title, setTitle] = useState<any>("")
   const setTitleFun=()=> {
       todoListsAPI.createTodolist(Title)
           .then((res) => {
               setState(res.data)
           })
   }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={"Title"} value={Title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
        <button onClick={setTitleFun}>Get tasks</button>
    </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [deletIdTodolist, setDeletIdTodolist] = useState<any>("")

    const DeleteFun=()=> {
        todoListsAPI.deleteTodolist(deletIdTodolist)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"id todolist for delete"} value={deletIdTodolist} onChange={(e)=>setDeletIdTodolist(e.currentTarget.value)}/>
            <button onClick={DeleteFun}>Get tasks</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [idTodolist, setidTodolist] = useState<any>("")
    const [title, settitle] = useState<any>("")
  const updatetodolistFun=()=> {
      todoListsAPI.updateTodolist(idTodolist, title)
          .then((res) => {
              setState(res.data)
          })
  }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"id todolist"} value={idTodolist} onChange={(e)=>setidTodolist(e.currentTarget.value)}/>
            <input placeholder={"new title"} value={title} onChange={(e)=>settitle(e.currentTarget.value)}/>
            <button onClick={updatetodolistFun}>Update todolist</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>("")
   const GetTaskFunktion=()=> {
       todoListsAPI.getTasks(todolistId)
           .then((res) => {
               setState(res.data)
           })
   }

    return <div> {JSON.stringify(state)}
    <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
    <button onClick={GetTaskFunktion}>Get tasks</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTask = () => {
        const todolistId = ''
        const taskId = ''
        todoListsAPI.deleteTasks(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>

            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, settaskTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTask = () => {

        todoListsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"task Title"} value={taskTitle} onChange={(e)=>{settaskTitle(e.currentTarget.value)}}/>

            <button onClick={deleteTask}>create task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [tasktId, settasktId] = useState<string>("")
    const [taskTitle, settaskTitle] = useState<string>("")
    const [taskDescription, settaskDescription] = useState<string>("")
    const [status, setstatus] = useState<number>(0)
    const [priority, setpriority] = useState<number>(0)
    const [startDate, setstartDate] = useState<string>("")
    const [deadline, setdeadline] = useState<string>("")
    const deleteTask = () => {

        todoListsAPI.updateTask(todolistId, tasktId,{
            deadline:"",
            description:taskDescription,
            priority:priority,
            startDate:"",
            status:status,
            title:taskTitle

        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"tasktId"} value={tasktId} onChange={(e)=>{settasktId(e.currentTarget.value)}}/>
            <input placeholder={"task Title"} value={taskTitle} onChange={(e)=>{settaskTitle(e.currentTarget.value)}}/>
            <input placeholder={"task description"} value={taskDescription} onChange={(e)=>{settaskDescription(e.currentTarget.value)}}/>
            <input placeholder={"task status"} value={status} type={"number"} onChange={(e)=>{setstatus(+e.currentTarget.value)}}/>
            <input placeholder={"task priority"} value={priority} type={"number"} onChange={(e)=>{setpriority(+e.currentTarget.value)}}/>

            <button onClick={deleteTask}>create task</button>
        </div>
    </div>
}
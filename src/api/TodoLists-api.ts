import axios from "axios";
const setting = {
    headers:{
        "API-KEY":"865054b3-8839-41aa-aa3c-1dce403daa1b"
    },
    withCredentials: true
}

export type TodolistType={
    id:string,
    title:string,
    addedDate:string,
    order:number
}
type CreateTodolistResponseType={
    resultCode:number,
    messages:Array<string>,
    data:{
        item:TodolistType
    }
}
export  const  todoListsAPI={
    getTodolist(){
        const promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", setting)
        return promise
    },
    createTodolist(title:string ){
       const promis = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",{title:title} ,setting)
        return promis
    },
    deleteTodolist(id:string){
        const promise= axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,setting)
        return promise
    },
    updateTodolist(id:string,title:string){
        const promise=  axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,{title: title} ,setting)
        return promise
    }
}
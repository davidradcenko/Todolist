import axios from "axios";
const setting = {
    headers:{
        "API-KEY":"865054b3-8839-41aa-aa3c-1dce403daa1b"
    },
    withCredentials: true
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
   ...setting

})
type TodolistType={
    id:string,
    title:string,
    addedDate:string,
    order:number
}
type ResponseType<B = {}>={
    resultCode:number,
    messages:Array<string>,
    data:B
}
export type TaskType={
    description: string,
    title: string,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}
export  type UpdateTaskType= {
    title: string,
    description: string,
    status: number,
    priority: number,
    startDate: string,
    deadline: string
}
type GetTasksResponse={
    error:string | null,
    totalCount: number,
    items: TaskType[]
}

export  const  todoListsAPI={
    getTodolist(){
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title:string ){
        return instance.post<ResponseType<{item:TodolistType}>>("todo-lists",{title:title} )
    },
    deleteTodolist(id:string){
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id:string,title:string){
        return  instance.put<ResponseType>(`todo-lists/${id}`,{title: title} )
    },
    getTasks(TodolistId:string){
        return instance.get<GetTasksResponse>(`todo-lists/${TodolistId}/tasks`)
    },
    deleteTasks(todolistId:string,taskId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}
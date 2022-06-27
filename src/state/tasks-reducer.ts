import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "../api/TodoLists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";

// type StateType = {
//     age: number,
//     childrenCount: number,
//     name: string
// }

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string
}
export type AddActionType = {
    type: "ADD-TASK",
    title: string,
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string,
    status: TaskStatuses,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string,
    title: string,
    todolistId: string
}

type ActionType =
    RemoveTaskActionType
    | AddActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>;

const initialState: TasksStateType={

}
export const tasksReducer = (state: TasksStateType = initialState , action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            const filteredTask = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTask
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask:TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId:action.todolistId,description:'',
                startDate:"",deadline:"",addedDate:"",
                order:0,priority:TodoTaskPriorities.Low}
            const tasks = stateCopy[action.todolistId]
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {

           //  let tasks = state[action.todolistId];
           //  let todolistsForID = tasks.find(tl => tl.id === action.taskId);
           //  if (todolistsForID) {
           //      todolistsForID.isDone = action.isDone;
           //  }
           //  return state
             const stateCopy = {...state}
             let task =stateCopy[action.todolistId]
            stateCopy[action.todolistId]=task.map(t=> t.id === action.taskId ? {...t, status:action.status} : t)
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {

            const stateCopy = {...state}
            let task = stateCopy[action.todolistId]
            stateCopy[action.todolistId]=task.map(t=> t.id === action.taskId ? {...t,title:action.title} : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId]= []
            return stateCopy
        }
        case 'REMOVE-TODOLIST':{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        }
        case 'SET-TODOLISTS':{
            const stateCopy = {...state}
            action.todolists.forEach(tl=>{
                stateCopy[tl.id]= []
            })
            return stateCopy
        }
        default:
            return state;
            //throw new Error("I don't understand this type")
    }

}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
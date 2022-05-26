import {FiltorValeosType, TodolistType} from "../App";
import {v1} from "uuid";

type StateType = {
    age: number,
    childrenCount: number,
    name: string
}

export type RemoveTodolistActionType ={
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType ={
    type: "ADD-TODOLIST",
    title: string,
    todolistId:string
}
export type ChangeTodolistTitleActionType ={
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType ={
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FiltorValeosType
}



type ActionType= RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl=>tl.id != action.id)
        }
        case "ADD-TODOLIST":{
            return [...state,{
                id:action.todolistId,
                title: action.title,
                filter: 'all'

            }]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            let todolistsForID = state.find(tl => tl.id === action.id);
            if (todolistsForID) {
                todolistsForID.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER':{
            let todolistsForID = state.find(tl => tl.id === action.id);
            if (todolistsForID) {
                todolistsForID.filter = action.filter;
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }

}
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title,todolistId: v1()}
}
export const changeTodolistTitleAC = (id:string , title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id:id,title:title}
}
export const changeTodolistFilterAC = (id:string , filter: FiltorValeosType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id:id,filter:filter}
}

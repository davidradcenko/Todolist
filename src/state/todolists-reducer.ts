import {todoListsAPI, TodolistType} from "../api/TodoLists-api";
import {Dispatch} from "redux";

// type StateType = {
//     age: number,
//     childrenCount: number,
//     name: string
// }


// сокрощено чтобы не делать типы и их обевление  type AddTodolistActionType ={
//     type: "ADD-TODOLIST",
//     title: string,
//     todolistId:string
// }







const initialState: Array<TodolistDomainType>= []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType):Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl=>tl.id !== action.id)

        case "ADD-TODOLIST":
            return [{...action.todolist,filter:"all"},...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=>tl.id === action.id ? {...tl,title:action.title}:tl)
            // let todolistsForID = state.find(tl => tl.id === action.id);
            // if (todolistsForID) {
            //     todolistsForID.title = action.title;
            // }
            // return [...state]

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=>tl.id === action.id ? {...tl,filter:action.filter}:tl)

        case 'SET-TODOLISTS':
            return action.todolists.map(tl=> ({...tl, filter:'all'}))

        default:
            return state
            //throw new Error("I don't understand this type")
    }

}


// action
export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id:string , title: string) => ( { type: 'CHANGE-TODOLIST-TITLE', id:id,title:title} as const )
export const changeTodolistFilterAC = (id:string , filter: FiltorValeosType) =>  ({ type: 'CHANGE-TODOLIST-FILTER', id:id,filter:filter} as const)
export const setTodolistsAC= (todolists: Array<TodolistType>)=> ({type:'SET-TODOLISTS',todolists} as const)


// thunk
export const fetchTodolistsTC = ()=> {
    return(dispatch: Dispatch<ActionType>)=>{
        todoListsAPI.getTodolist()
            .then((res)=>{
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const removeTodolistsTC = (todolistId:string)=> {
    return(dispatch: Dispatch<ActionType>)=>{
        todoListsAPI.deleteTodolist(todolistId)
            .then((res)=>{
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodolistsTC = (title:string)=> {
    return(dispatch: Dispatch<ActionType>)=>{
        todoListsAPI.createTodolist(title)
            .then((res)=>{
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleTC = (id:string , title: string)=> {
    return(dispatch: Dispatch<ActionType>)=>{
        todoListsAPI.updateTodolist(id,title)
            .then((res)=>{
                dispatch(changeTodolistTitleAC(id,title))
            })
    }
}


//types
type ActionType=
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type  RemoveTodolistActionType= ReturnType<typeof removeTodolistAC>
export type  SetTodolistsActionType= ReturnType<typeof setTodolistsAC>
export type FiltorValeosType = "all" | "completed" | "active";
export type TodolistDomainType= TodolistType & {
    filter:FiltorValeosType
}
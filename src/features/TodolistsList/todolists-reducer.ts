import {todoListsAPI, TodolistType} from "../../api/TodoLists-api";
import {Dispatch} from "redux";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatusAC, SetStatusActionType} from "../../app/app-reducer";

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
            return [{...action.todolist,filter:"all",entityStatus:"idle"},...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=>tl.id === action.id ? {...tl,title:action.title}:tl)
            // let todolistsForID = state.find(tl => tl.id === action.id);
            // if (todolistsForID) {
            //     todolistsForID.title = action.title;
            // }
            // return [...state]

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=>tl.id === action.id ? {...tl,filter:action.filter}:tl)

        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl=>tl.id === action.id ? {...tl,entityStatus:action.status}:tl)

        case 'SET-TODOLISTS':
            return action.todolists.map(tl=> ({...tl, filter:'all',entityStatus:"idle"}))

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
export const changeTodolistEntityStatusAC= (id:string,status:RequestStatusType)=> ({type:'CHANGE-TODOLIST-ENTITY-STATUS',id,status} as const)


// thunk
export const fetchTodolistsTC = ():AppThunk => {
    return(dispatch:ThunkDispatch)=>{
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.getTodolist()
            .then((res)=>{
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const removeTodolistsTC = (todolistId:string):AppThunk=> {
    return(dispatch:ThunkDispatch)=>{
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
        todoListsAPI.deleteTodolist(todolistId)
            .then((res)=>{
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTodolistsTC = (title:string):AppThunk=> {
    return(dispatch:ThunkDispatch)=>{
        dispatch(setAppStatusAC('loading'))
        todoListsAPI.createTodolist(title)
            .then((res)=>{
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const changeTodolistTitleTC = (id:string , title: string):AppThunk=> {
    return(dispatch:Dispatch<ActionType>)=>{
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
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type  RemoveTodolistActionType= ReturnType<typeof removeTodolistAC>
export type  SetTodolistsActionType= ReturnType<typeof setTodolistsAC>
export type FiltorValeosType = "all" | "completed" | "active";
export type TodolistDomainType= TodolistType & {
    filter:FiltorValeosType
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionType | SetStatusActionType>
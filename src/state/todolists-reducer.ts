import {v1} from "uuid";
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



type ActionType=
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

export type FiltorValeosType = "all" | "completed" | "active";

const initialState: Array<TodolistDomainType>= []
export type TodolistDomainType= TodolistType & {
 filter:FiltorValeosType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType):Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl=>tl.id !== action.id)
        }
        case "ADD-TODOLIST":{
            const newTodolist:TodolistDomainType= {...action.todolist,filter:"all"}
            return [newTodolist,...state]
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
        case 'SET-TODOLISTS':{
            return action.todolists.map(tl=> {
                return {
                    ...tl,
                    filter:'all'
                }
            })
        }
        default:
            return state
            //throw new Error("I don't understand this type")
    }

}
  // это способ как сгенерировать автоматически экшан криентор, но все равно можно кароче type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist})
export const changeTodolistTitleAC = (id:string , title: string) => ( { type: 'CHANGE-TODOLIST-TITLE', id:id,title:title} as const )
export const changeTodolistFilterAC = (id:string , filter: FiltorValeosType) =>  ({ type: 'CHANGE-TODOLIST-FILTER', id:id,filter:filter} as const)
export const setTodolistsAC= (todolists: Array<TodolistType>)=> ({type:'SET-TODOLISTS',todolists} as const)



//  воно сакратить слово return и писать в одну строку export const addTodolistAC = (title: string) => {
//    return { type: 'ADD-TODOLIST', title,todolistId: v1()}
//}

export const fetchTodolistsTC = ()=> {
    return(dispatch: Dispatch)=>{
        todoListsAPI.getTodolist()
            .then((res)=>{
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistsTC = (todolistId:string)=> {
    return(dispatch: Dispatch)=>{
        todoListsAPI.deleteTodolist(todolistId)
            .then((res)=>{
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
import {AnyAction, applyMiddleware, combineReducers,legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";


const   rootReducer = combineReducers({
    todolist:todolistsReducer,
    tasks:tasksReducer,
    app:appReducer
})
// type AppRootState={
//     todolist: Array<TodolistType>,
//     task: TasksStateType
// }


export const store=createStore(rootReducer,applyMiddleware(thunk))

export type RootState= ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootState, unknown, AnyAction>


// @ts-ignore
window.store=store;
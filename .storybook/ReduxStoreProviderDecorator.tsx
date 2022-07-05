import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from '../src/features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../src/features/TodolistsList/todolists-reducer'
import {v1} from 'uuid'
import {RootState} from '../src/app/store'
import {TaskStatuses, TodoTaskPriorities} from "../src/api/TodoLists-api";
import {appReducer} from "../src/app/app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer,
    app: appReducer
})

const initialGlobalState: RootState = {
    todolist: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: '',entityStatus:"idle"},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus:"loading"}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                description: '', startDate: "", deadline: "", addedDate: "", order: 0, priority: TodoTaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                description: '', startDate: "", deadline: "", addedDate: "", order: 0, priority: TodoTaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2",
                description: '', startDate: "", deadline: "", addedDate: "", order: 0, priority: TodoTaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todolistId2",
                description: '', startDate: "", deadline: "", addedDate: "", order: 0, priority: TodoTaskPriorities.Low
            }
        ]
    },
    app: {
        error: null,
        status: 'idle'
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState,applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()} </Provider>)

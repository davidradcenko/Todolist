import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../src/features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../src/features/TodolistsList/todolists-reducer'
import {v1} from 'uuid'
import {AppRootState} from '../src/app/store'
import {TaskStatuses, TodoTaskPriorities} from "../src/api/TodoLists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
})

const initialGlobalState:AppRootState = {
    todolist: [
        {id: "todolistId1", title: "What to learn", filter: "all", order:0,addedDate:''},
        {id: "todolistId2", title: "What to buy", filter: "all", order:0,addedDate:''}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status:TaskStatuses.Completed,todoListId:"todolistId1",
                description:'',startDate:"",deadline:"",addedDate:"",order:0,priority:TodoTaskPriorities.Low},
            {id: v1(), title: "JS", status:TaskStatuses.Completed,todoListId:"todolistId1",
                description:'',startDate:"",deadline:"",addedDate:"",order:0,priority:TodoTaskPriorities.Low}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status:TaskStatuses.Completed,todoListId:"todolistId2",
                description:'',startDate:"",deadline:"",addedDate:"",order:0,priority:TodoTaskPriorities.Low},
            {id: v1(), title: "React Book", status:TaskStatuses.Completed,todoListId:"todolistId2",
                description:'',startDate:"",deadline:"",addedDate:"",order:0,priority:TodoTaskPriorities.Low}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider  store={storyBookStore}>{storyFn()} </Provider>)

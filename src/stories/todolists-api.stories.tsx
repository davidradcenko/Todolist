import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todoListsAPI} from "../api/TodoLists-api";

export default {
    title: 'API'
}
const setting = {
    headers:{
        "API-KEY":"865054b3-8839-41aa-aa3c-1dce403daa1b"
    },
    withCredentials: true
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodolist()
            .then((res) => {
                setState(res.data[0])
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.createTodolist("abababab ")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId= 'b378a91c-bc97-4ff0-8e2c-6a69b676a0ef'
            todoListsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId= 'b378a91c-bc97-4ff0-8e2c-6a69b676a0ef'
todoListsAPI.updateTodolist(todolistId,"eqeqeqe")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

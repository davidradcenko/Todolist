import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {ResponseType} from "../api/TodoLists-api"
import {Dispatch} from "redux";

export  const handeleServerAppError= <B>(data: ResponseType<B>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>)=>{
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC('failed'))
}

export  const handeleServerNetworkError= (error: { message:string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>)=>{
    dispatch(setAppErrorAC(error.message ? error.message: 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
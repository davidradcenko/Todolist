import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    t: TaskType,
    todolistID: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const onRevoveHander = () => dispatch(removeTaskAC(props.t.id, props.todolistID))
    const OnChencStatusHandle = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked

        dispatch(changeTaskStatusAC(props.t.id, newIsDoneValue, props.todolistID))
    }
    const OnChencheTitleHandle = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.t.id, newValue, props.todolistID))
    },[props.t.id,props.todolistID])
    return <div className={props.t.isDone === true ? "is-done" : ""} key={props.t.id}>
        <Checkbox onChange={OnChencStatusHandle} checked={props.t.isDone}/>
        <EditableSpan onChange={OnChencheTitleHandle} title={props.t.title}/>
        <IconButton aria-label="delete" onClick={onRevoveHander}>
            <Delete/>
        </IconButton>
    </div>
})
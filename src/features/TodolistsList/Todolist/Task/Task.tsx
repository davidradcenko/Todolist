import {useDispatch} from "react-redux";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/TodoLists-api";
import {useAppDispatch} from "../../../../app/hooks";

type TaskPropsType = {
    t: TaskType,
    todolistID: string,
    RemoveTasks:(id: string, todolistId: string) => void,
    ChengeStatusTask:(taskId: string, status: TaskStatuses, todolistId: string)=> void,
    ChengeTitleTask:(taskId: string, newTitle: string, todolistId: string)=>void
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useAppDispatch()
    //const onRevoveHander = () => dispatch(removeTaskAC(props.t.id, props.todolistID))
    const onRevoveHander = () => props.RemoveTasks(props.t.id,props.todolistID)

    const OnChencStatusHandle = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        // dispatch(changeTaskStatusAC(props.t.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID))
       props.ChengeStatusTask(props.t.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID)
    }

    const OnChencheTitleHandle = useCallback((newValue: string) => {
       props.ChengeTitleTask(props.t.id, newValue, props.todolistID)
    },[props.t.id,props.todolistID])


    return <div className={props.t.status === TaskStatuses.Completed ? "is-done" : ""} key={props.t.id}>
        <Checkbox
            onChange={OnChencStatusHandle}
            checked={props.t.status === TaskStatuses.Completed}/>
        <EditableSpan
            onChange={OnChencheTitleHandle}
            title={props.t.title}/>
        <IconButton aria-label="delete" onClick={onRevoveHander}>
            <Delete/>
        </IconButton>
    </div>
})
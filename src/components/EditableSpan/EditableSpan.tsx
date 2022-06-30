import TextField from "@mui/material/TextField";
import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string,
    onChange:(newValue:string) => void
}

export const EditableSpan=React.memo((props: EditableSpanType)=> {
    let [editMode, SetEditMode] = useState(false)
    let [title, setTitle] = useState("")

    function EditSetMode() {
        SetEditMode(true)
        setTitle(props.title)
    }
    function activateViewMode() {
        SetEditMode(false)
        props.onChange(title)
    }
    function onChancheTitle(e:ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField value={title} onChange={onChancheTitle} type={"text"} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={EditSetMode}>{props.title}</span>
    )
})
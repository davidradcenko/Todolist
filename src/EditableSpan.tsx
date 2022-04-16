import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
    title: string,
    onChenge:(newValue:string) => void
}

export function EditableSpan(props: EditableSpanType) {
    let [editMode, SetEditMode] = useState(false)
    let [title, setTitle] = useState("")

    function EditSetMode() {
        SetEditMode(true)
        setTitle(props.title)
    }
    function activateViewMode() {
        SetEditMode(false)
        props.onChenge(title)
    }
    function onChancheTitle(e:ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title} onChange={onChancheTitle} type={"text"} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={EditSetMode}>{props.title}</span>
    )
}
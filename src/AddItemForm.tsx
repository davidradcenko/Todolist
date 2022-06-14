import { IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    const [newTaskTitel, setnewTaskTitel] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChengeHander = (e: ChangeEvent<HTMLInputElement>) => {
        setnewTaskTitel(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addItem(newTaskTitel)
            setnewTaskTitel("")
        }
    }
    const addTask = () => {
        if (newTaskTitel.trim() !== "") {
            props.addItem(newTaskTitel.trim())
            setnewTaskTitel("")
        } else {
            setError("Title is required")
        }
    }
    return (
        <div>
            <TextField value={newTaskTitel}
                       variant={"outlined"}
                       label={'Type value'}
                       onChange={onNewTitleChengeHander}
                       onKeyPress={onKeyPress}
                       type="text"
                       error={!!error}
                       helperText={!!error}
            />
            <IconButton onClick={addTask}  color={'primary'}>
                <ControlPoint />
            </IconButton>
        </div>
    )
}
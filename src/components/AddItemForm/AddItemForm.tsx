import { IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void,
    disabled?:boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormType) =>{
    const [newTaskTitel, setnewTaskTitel] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChengeHander = (e: ChangeEvent<HTMLInputElement>) => {
        setnewTaskTitel(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null ){
            setError(null)
        }
        if (e.charCode === 13) {
            addItem(newTaskTitel)
            setnewTaskTitel("")
        }
    }
    const addItemHandler = () => {
        if (newTaskTitel.trim() !== "") {
            addItem(newTaskTitel.trim())
            setnewTaskTitel("")
        } else {
            setError("Title is required")
        }
    }
    return (
        <div>
            <TextField value={newTaskTitel}
                       disabled={disabled}
                       variant={"outlined"}
                       label={'Type value'}
                       onChange={onNewTitleChengeHander}
                       onKeyPress={onKeyPress}
                       type="text"
                       error={!!error}
                       helperText={!!error}
            />
            <IconButton onClick={addItemHandler}  color={'primary'} disabled={disabled}>
                <ControlPoint />
            </IconButton>
        </div>
    )
});
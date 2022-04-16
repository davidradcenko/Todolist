import { Button } from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input value={newTaskTitel}
                   onChange={onNewTitleChengeHander}
                   onKeyPress={onKeyPress}
                   type="text"
                   className={error ? "error" : ""}/>
            <Button onClick={addTask} variant={'contained'} color={'primary'}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
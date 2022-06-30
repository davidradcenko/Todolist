import {AddItemForm} from "../AddItemForm/AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'EditableSpan Component',
    component : EditableSpan
}
const callback=action("Title changed ")
export  const  EditableSpanBaseExample = ()=>{
    return <EditableSpan title={"Start title"} onChange={callback}/>
}
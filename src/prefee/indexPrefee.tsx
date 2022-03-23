import {ChangeEvent, useState} from "react";

type TypeArr={
    id:string,
    titel:string,
    active:boolean
}
type MyAPPType={
    arr:  Array<TypeArr>,
    ChencheArr: (title:any) => void,
    DeleteArr:(id:string) => void,
}

export let MyAPP = (props: MyAPPType) => {
    let [State,setState]=useState("FF")

    let ChancheState =(e:ChangeEvent<HTMLInputElement>)=>{
        console.log(e)
        setState(e.currentTarget.value)
    }

    return (<div>
        <form action="">
            <input value={State} onChange={ChancheState}  type="text"/>
            <input onClick={()=>{props.ChencheArr(State)}} type="button"/>
            <ul>
                {props.arr.map( t=>{
                        return  <li key={t.id}><input type="checkbox" checked={t.active}/> {t.titel} <input onClick={()=>{props.DeleteArr(t.id)} }type={"button"} value={"X"}/></li>
                })}
            </ul>
            <input type="button" value={"all"}/>
            <input type="button" value={"Only cheked"}/>
            <input type="button" value={"Only distroy"}/>
        </form>
    </div>)
}
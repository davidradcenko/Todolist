import {MyAPP} from "./indexPrefee";
import {useState} from "react";
import {v1} from "uuid";

export  let IndexPrefeeData =(props: any)=>{

    let [Arr,setArr] = useState([
        {id:v1(),titel:"1+1",active:false},
        {id:v1(),titel:"Звездные воины",active:true},
        {id:v1(),titel:"Военная хроника",active:true},
        {id:v1(),titel:"Крестный отец",active:true}
    ])
     let ChencheArr =(titel: any)=>{
         let NewTitel= {id:v1(),titel:titel,active:false}
         let NewTitels=[NewTitel,...Arr]
         setArr(NewTitels)
    }
    let DeleteArr=(id:string)=>{
        let newArray=Arr.filter(t=> t.id !== id)
        setArr(newArray)
    }
    return(
        <MyAPP DeleteArr={DeleteArr} ChencheArr={ChencheArr} arr={Arr}/>
    )
}
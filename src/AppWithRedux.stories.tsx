import React from "react";
import AppWithRedux from "./AppWithRedux"
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "../.storybook/ReduxStoreProviderDecorator";

export default {
    title: 'AddWithRedux Component',
    component : AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]

}

export  const  AppWithReduxBaseExample = ()=>{
    return  <AppWithRedux />
}
import {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FiltorValeosType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../../api/TodoLists-api";
import {RequestStatusType} from "../../app/app-reducer";






test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:'', order:0,entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:'', order:0,entityStatus:"idle"}
    ]

    // const endState = todolistsReducer(startState, {
    //     type: 'REMOVE-TODOLIST',
    //     id: todolistId1
    // })
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle:TodolistType = {
        id:"blala",
            title:"New Todolist",
            order:0,
            addedDate:''
    };

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:'', order:0,entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:'', order:0,entityStatus:"idle"}
    ]
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle.title);
    expect(endState[0].filter).toBe("all");

});
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:'', order:0,entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:'', order:0,entityStatus:"idle"}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2,newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FiltorValeosType = "completed";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:'', order:0,entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:'', order:0,entityStatus:"idle"}
    ]
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2,newFilter) );

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
const startState: Array<TodolistDomainType> = [
    {id: v1(), title: "What to learn", filter: "all", addedDate:'', order:0,entityStatus:"idle"},
    {id: v1(), title: "What to buy", filter: "all", addedDate:'', order:0,entityStatus:"idle"}
]

test('todolist should be set to the state ', () => {
    const  action= setTodolistsAC(startState)
    const endState = todolistsReducer([],action);
    expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newStatus: RequestStatusType = "loading";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:'', order:0,entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:'', order:0,entityStatus:"idle"}
    ]
    const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId2,newStatus) );

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});

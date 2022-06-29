import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {TaskStatuses, TaskType, todoListsAPI, TodoTaskPriorities, UpdateTaskType} from "../api/TodoLists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

// type StateType = {
//     age: number,
//     childrenCount: number,
//     name: string
// }

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string
}
export type AddActionType = {
    type: "ADD-TASK",
    task: TaskType
}
export type UpdateTaskActionType = {
    type: "UPDATE-TASK"
    taskId: string,
    model: UpdateDomeinTaskModelType,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string,
    title: string,
    todolistId: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
type ActionType =
    RemoveTaskActionType
    | AddActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | SetTasksActionType;

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todolistId];
            const filteredTask = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTask
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }
        case 'UPDATE-TASK': {

            //  let tasks = state[action.todolistId];
            //  let todolistsForID = tasks.find(tl => tl.id === action.taskId);
            //  if (todolistsForID) {
            //      todolistsForID.isDone = action.isDone;
            //  }
            //  return state
            const stateCopy = {...state}
            let task = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = task.map(t => t.id === action.taskId ? {...t,...action.model} : t)
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {

            const stateCopy = {...state}
            let task = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = task.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state;
        //throw new Error("I don't understand this type")
    }

}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (task: TaskType): AddActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomeinTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks: tasks, todolistId}
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch,) => {
        todoListsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}
export const removeTaskTC = (taskid: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.deleteTasks(todolistId, taskid)
            .then(res => {
                const action = removeTaskAC(taskid, todolistId)
                dispatch(action)
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.createTask(todolistId, title)
            .then(res => {
                const tasks = res.data.data.item
                const action = addTaskAC(tasks)
                dispatch(action)
            })
    }
}
export  type UpdateDomeinTaskModelType= {
    title?: string,
    description?: string,
    status?: number,
    priority?: number,
    startDate?: string,
    deadline?: string
}
export const updateTaskTC = (taskId: string, domainmodel: UpdateDomeinTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if(!task){
            console.warn("Task not found in the state")
            return
        }
        const apiModel: UpdateTaskType = {
            deadline: task.deadline,
            description:task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...domainmodel
        }
        todoListsAPI.updateTask(todolistId,taskId, apiModel)
            .then(res => {

                const action = updateTaskAC(taskId,domainmodel,todolistId)
                dispatch(action)
            })
    }
}
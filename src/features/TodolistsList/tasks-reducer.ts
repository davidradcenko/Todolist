import {TasksStateType} from "../../app/App";
import {v1} from "uuid";
import {TaskStatuses, TaskType, todoListsAPI, TodoTaskPriorities, UpdateTaskType} from "../../api/TodoLists-api";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {AppThunk, RootState} from "../../app/store";
import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from "../../app/app-reducer";
import {useAppDispatch} from "../../app/hooks";

type StateType = {
    age: number,
    childrenCount: number,
    name: string
}

// export type RemoveTaskActionType = {
//     type: "REMOVE-TASK",
//     todolistId: string,
//     taskId: string
// }
// export type AddActionType = {
//     type: "ADD-TASK",
//     task: TaskType
// }
// export type UpdateTaskActionType = {
//     type: "UPDATE-TASK"
//     taskId: string,
//     model: UpdateDomeinTaskModelType,
//     todolistId: string
// }
// export type ChangeTaskTitleActionType = {
//     type: "CHANGE-TASK-TITLE"
//     taskId: string,
//     title: string,
//     todolistId: string
// }
// export type SetTasksActionType = {
//     type: 'SET-TASKS'
//     tasks: Array<TaskType>
//     todolistId: string
// }

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: Actiotype): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
            // const stateCopy = {...state}
            // const tasks = state[action.todolistId];
            // const filteredTask = tasks.filter(t => t.id !== action.taskId)
            // stateCopy[action.todolistId] = filteredTask
            // return stateCopy
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
            // const stateCopy = {...state}
            // const newTask = action.task
            // const tasks = stateCopy[newTask.todoListId]
            // const newTasks = [newTask, ...tasks]
            // stateCopy[newTask.todoListId] = newTasks
            // return stateCopy
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
            //  let tasks = state[action.todolistId];
            //  let todolistsForID = tasks.find(tl => tl.id === action.taskId);
            //  if (todolistsForID) {
            //      todolistsForID.isDone = action.isDone;
            //  }
            //  return state


            // const stateCopy = {...state}
            // let task = stateCopy[action.todolistId]
            // stateCopy[action.todolistId] = task.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            // return stateCopy
        }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        }
            const stateCopy = {...state}
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
            // const stateCopy = {...state}
            // stateCopy[action.todolistId] = action.tasks
            // return stateCopy
        }
        default:
            return state;
        //throw new Error("I don't understand this type")
    }

}
// action
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomeinTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    model,
    todolistId,
    taskId
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks: tasks,
    todolistId
} as const)


// thunk
export const fetchTasksTC = (todolistId: string): AppThunk => {
    return (dispatch: Dispatch<Actiotype | SetStatusActionType>) => {
        dispatch(setStatusAC('loading'))
        todoListsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

export const removeTaskTC = (taskid: string, todolistId: string): AppThunk => (dispatch: Dispatch<Actiotype>) => {
    todoListsAPI.deleteTasks(todolistId, taskid)
        .then(res => {
            const action = removeTaskAC(taskid, todolistId)
            dispatch(action)
        })
}

export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch: Dispatch<Actiotype | SetErrorActionType | SetStatusActionType>) => {
    dispatch(setStatusAC('loading'))
    todoListsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const tasks = res.data.data.item
                const action = addTaskAC(tasks)
                dispatch(action)
                dispatch(setStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC("Some error occurred"))
                }
                dispatch(setStatusAC('failed'))
            }
        })
}

export const updateTaskTC = (taskId: string, domainmodel: UpdateDomeinTaskModelType, todolistId: string): AppThunk => (dispatch: Dispatch<Actiotype>, getState: () => RootState) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        console.warn("Task not found in the state")
        return
    }
    const apiModel: UpdateTaskType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...domainmodel
    }
    todoListsAPI.updateTask(todolistId, taskId, apiModel)
        .then(res => {

            const action = updateTaskAC(taskId, domainmodel, todolistId)
            dispatch(action)
        })
}


// types
export  type UpdateDomeinTaskModelType = {
    title?: string,
    description?: string,
    status?: number,
    priority?: number,
    startDate?: string,
    deadline?: string
}
type Actiotype =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType;
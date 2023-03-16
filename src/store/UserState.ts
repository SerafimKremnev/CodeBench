import { makeAutoObservable } from "mobx"
import {ITaskMain} from "../components/TaskFolder/TaskList/TaskList";

export interface IUser {
    _id: string,
    login: string,
    token: string
    isAdmin: boolean
    completedTasks: ITaskData[]
}

export interface ITaskData {
    task: ITaskMain
    decision: string
}

type Token = string | null
const tokenStorage = localStorage.getItem('token')
class Users {
    token: Token = tokenStorage ? tokenStorage.replaceAll(`"`, '') : null
    getToken(token: Token) {
        this.token = token
    }
    logout(){
        this.token = ''
        localStorage.removeItem('token')
    }
    constructor() {
        makeAutoObservable(this)
    }

}
export default new Users()
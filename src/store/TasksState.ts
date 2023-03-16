import { makeAutoObservable } from "mobx"

interface Test {
    args: any[]
    expected: any
}
interface Task {
    _id: string,
    name: string,
    description: string,
    tests: Test[],
    completed: boolean,
    speedArgs: any[],
    defaultFunc: string
}

class Tasks {
    tasks: Task[] = []
    getTasks(tasks: Task[]){
        this.tasks = tasks
    }
    constructor() {
        makeAutoObservable(this)
    }

}

export default new Tasks()
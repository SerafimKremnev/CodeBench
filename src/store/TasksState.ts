import { makeAutoObservable } from "mobx"

interface Task {
    id: string,
    name: string,
    description: string,
    test: string
}

class Tasks {

    tasks: Task[] = [
        {id: '2546314', name: 'Функция возведения в степень', description: 'Напишите функцию которая возвращает первый аргумент в степени второго аргумента', test: 'function test()'}
    ]

    constructor() {
        makeAutoObservable(this)
    }

}

export default new Tasks()
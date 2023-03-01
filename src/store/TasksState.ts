import { makeAutoObservable } from "mobx"

interface Test {
    args: any[]
    expected: any
}
interface Task {
    id: string,
    name: string,
    description: string,
    tests: Test[],
    completed: boolean,
    speedArgs: any[],
    defaultFunc: string
}

class Tasks {
    tasks: Task[] = [
        {
            id: '2546314',
            name: 'Функция возведения в степень',
            defaultFunc: "function pow(a, n) {\r\n     \r\n}",
            description: 'Напишите функцию которая возвращает первый аргумент в степени второго аргумента',
            tests: [
                {
                    args: [2, 3],
                    expected: 8
                },
                {
                    args: [3, 3],
                    expected: 27
                },
                {
                    args: [5, 12],
                    expected: 244140625
                },
            ],
            completed: false,
            speedArgs: [2, 1000000]
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }

}

export default new Tasks()
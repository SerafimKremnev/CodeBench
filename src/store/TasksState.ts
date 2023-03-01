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
        },
        {
            id: '1537891',
            name: 'Самый маленький и большой',
            defaultFunc: "function highAndLow(numbers) {\r\n     \r\n} \n\n//highAndLow('1 2 3 4 5') return '5 1'",
            description: 'Вам дается строка чисел, разделенных пробелами, и вы должны вернуть наибольшее и наименьшее число.',
            tests: [
                {
                    args: ['1 2 3 4 5'],
                    expected: '5 1'
                },
                {
                    args: ["1 2 -3 4 5"],
                    expected: "5 -3"
                },
                {
                    args: ["1 9 3 4 -5"],
                    expected: "9 -5"
                },
            ],
            completed: false,
            speedArgs: ["1123 7 35 1 3284 -15 384 126 387 11 -231 7234 231 -3 483 82374 2 8 8 22 343 23"]
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }

}

export default new Tasks()
const taskWorker = (): void => {
    self.onmessage = function (e) {
        let func = new Function(`return ${e.data}`)
        let test = func()
        let result;
        if(test(2,3) === 8 && test(3,3) === 27 && test(5, 12) === 244140625) {
            result = 'Все тесты пройдены'
        } else {
            throw new Error('Задача решена неверно')
        }
        let score = 0;
        let need = Date.now() + 1000;
        while (Date.now() < need) {
            test(2, 1000000);
            score++;
        }
        score = 1000 / score
        self.postMessage({result, score});
    };
};

let code = taskWorker.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));


const blob = new Blob([code], { type: "application/javascript" });
const taskWorker_script = URL.createObjectURL(blob);

export { taskWorker_script };

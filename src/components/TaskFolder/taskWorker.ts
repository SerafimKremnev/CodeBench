const taskWorker = (): void => {
    self.onmessage = function (e) {
        let func = new Function(`return ${e.data.code}`)
        let test = func();
        const testData = JSON.parse(e.data.test)
        let result;
        console.log(e)
        if( test(...testData[0].args) === testData[0].expected &&
            test(...testData[1].args) === testData[1].expected &&
            test(...testData[2].args) === testData[2].expected ) {
            result = 'Все тесты пройдены'
        } else {
            throw new Error('Задача решена неверно')
        }
        let score = 0;
        let need = Date.now() + 1000;

        while (Date.now() < need) {
            test(...(JSON.parse(e.data.args)));
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

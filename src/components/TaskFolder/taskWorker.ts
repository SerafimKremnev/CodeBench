const taskWorker = (): void => {
    self.onmessage = function (e) {
        let func = new Function(`return ${e.data}`)
        let test = func()
        let result;
        if(test(2,3) === 8 && test(3,3) === 27 && test(5, 12) === 244140625) {
            result = 'Tests is pass'
        } else {
            throw new Error('Tests is failed')
        }
        self.postMessage(result);
    };
};

let code = taskWorker.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));


const blob = new Blob([code], { type: "application/javascript" });
const taskWorker_script = URL.createObjectURL(blob);

export { taskWorker_script };

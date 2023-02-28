// worker.js
const workercode = () => {
  const COUNT_TESTS = 1000;
  self.onmessage = function (e) {
    console.log("e.data", e.data);

    const func = new Function(e.data);
    if (typeof func !== "function") {
      //   self.postMessage("Введите функцию");
      throw new Error("Введите функцию");
    }
    const start = performance.now();

    let score = 0;
    let need = Date.now() + 1000;
    while (Date.now() < need) {
      func();
      score++;
    }
    // for (let i = 0; i <= COUNT_TESTS; i++) {
    //   func();
    // }

    const end = performance.now();
    // self.postMessage((end - start) / COUNT_TESTS);
    self.postMessage(score);
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export { worker_script };

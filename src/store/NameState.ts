import { makeAutoObservable } from "mobx";

class Names {
    benches: string[] = ['Поле 1', 'Поле 2'];

    constructor() {
        makeAutoObservable(this);
    }
    rename(index: number, name: string) {
        this.benches[index] = name;
    }
    addName() {
        this.benches.push(`Поле ${this.benches.length + 1}`);
    }
    deleteName(index: number) {
        this.benches.splice(index, 1);
    }
    getName() {
        return this.benches;
    }
}

export default new Names();

import { makeAutoObservable } from "mobx";

export interface IBench {
  id: string;
  name: string;
  score: number | string;
  code: string;
}

class Benches {
  benches: IBench[] = [
    {
      id: "1",
      name: "Поле 1",
      score: 0,
      code: "for (let i = 0; i < 10000000; i++);",
    },
    {
      id: "2",
      name: "Поле 2",
      score: 0,
      code: "for (let i = 0; i < 10000000; i++);",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  // renameField(index: number, name: string) {
  //   this.benches[index].name = name;
  // }

  addField() {
    this.benches.push({
      id: String(Date.now()),
      name: `Поле ${this.benches.length + 1}`,
      score: 0,
      code: "for (let i = 0; i < 10000000; i++);",
    });
  }
  deleteField(index: number) {
    this.benches.splice(index, 1);
  }
  getFields() {
    return this.benches;
  }
  setScore(index: number, score: string | number) {
    this.benches[index].score = score;
  }
  setCode(index: number, code: string) {
    this.benches[index].code = code;
  }
}

export default new Benches();

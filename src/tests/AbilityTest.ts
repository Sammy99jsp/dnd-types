import { System as S } from "../System";
import { DND_5E as D } from "../5E";

const Test = D.Ability.CHA(
    D.Ability.Score.RAW(20)
);

console.log(Test);
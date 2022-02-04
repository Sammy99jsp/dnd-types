import { System as S } from "../System";
import { DND_5E as D } from "../5E";

const testScore = D.Ability.Score.DEX(
    D.Ability.Score.Raw(12)
);

const testCheck = D.Ability.Check(
    15, D.Ability.Skill.PERCEPTION
);


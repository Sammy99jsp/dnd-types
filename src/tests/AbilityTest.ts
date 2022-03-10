import { System as S } from "../System";
import { DND_5E as D } from "../5E";

const testScore = D.Ability.Score.(
    D.Ability.Score.Raw(12)
);

/// Make a DC 15 Perception (Wisdom) Check...
const testCheck = D.Ability.Check(
    D.Ability.Skill.PERCEPTION, { DC : 15 }
);

/// Make a Constitution Saving Throw without a defined DC.
const testSave = D.Ability.Save(
    D.Ability.CONSTITUTION
);

const checkMeGodForIHaveSinned = D.Ability.Check(
    D.Ability.Skill.RELIGION
);

const testSaveTwo = D.Ability.Save(
    D.Ability.CHARISMA, { DC : 15}
);

// console.log(testSave.Ability.Name.toString());

// entity.Check(checkMeGodForIHaveSinned)
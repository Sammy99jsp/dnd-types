import { DND_5E as D } from "../5E";
import { System as S } from "../System"

const Test : S.Entity = {
    _: "SRD.ENTITY",
    Name: "Test Entity",
    Race : undefined as unknown as S.Race,
    Class : [{}],
    // Speed : {},
    Actions: [],
    Features : [],
    Inventory : {
        _: "SRD.ENTITY.INVENTORY",
        Currencies: [],
        Weight: 1234,
        Items : []
    },

    async Check(Check) {
        let stat : S.Ability.AbilityScore<S.Ability, S.Ability.Skill<S.Ability> | never>;
        // Get appropriate stats, with fallback if appropriate.
        const isSkill = Check.Property._.startsWith("SRD.ABILITY.SKILL");
        if(isSkill) {
            stat    = this.Stats.Skills(Check.Property as S.Ability.Skill<S.Ability>);
        } else {
            stat    = this.Stats.Abilities(Check.Property as S.Ability)
        }

        // TODO: Replace with Dice.Roll()
        const d20Res = Math.floor(Math.random() * 20);
        console.log(`Making ${Check.Property.Name} check ${Check.DC ? `with DC ${Check.DC}` : ""}!`);

        return {
            Property: Check.Property,
            Value: d20Res + stat.Score.Modifier,
            Raw  : d20Res,
            Modifiers : [],
            ...(Check.DC ? {Pass: d20Res >= Check.DC} : {}),
        };

    },
    async Save(Save) {
        // TODO: Replace with Dice.Roll()

        let stat = this.Stats.SavingThrows(Save.Ability);

        const d20Res = Math.floor(Math.random() * 20);
        console.log(`Making save with DC ${Save.DC} !`);
        const result : S.Ability.Save.Result<typeof Save.Ability> = {
            Save,
            Value: d20Res,
            Raw  : d20Res + stat.Score.Modifier,
            Modifiers : [],
            ...(Save.DC ? {Pass: d20Res >= Save.DC} : {}),
        }
        return result;
    },
} 

const TestCheck = D.Ability.Check(
    D.Ability.Skill.ANIMAL_HANDLING, { DC : 12 }
);

Test.Check(TestCheck).then(R => console.log(R));

const TestSave  = D.Ability.Save(
    D.Ability.CONSTITUTION, { DC : 12 }
);

Test.Save(TestSave).then(R => console.log(R));
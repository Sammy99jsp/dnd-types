import { Reference, System as S, Utils, _ } from "../System";
import { DND_5E as D } from "../5E";


const   STR = D.Ability.STRENGTH,
        DEX = D.Ability.DEXTERITY,
        CON = D.Ability.CONSTITUTION,
        INT = D.Ability.INTELLIGENCE,
        WIS = D.Ability.WISDOM,
        CHA = D.Ability.CHARISMA;



type InlineMod = number | { Modifier : number, Raw ?: number };

interface EntityGenParams {
    Name  : string
    Stats : {
        Abilities : _.Index<S.Ability, InlineMod>;
        Skills    : _.Index<S.Ability.Skill<S.Ability>, InlineMod>;

        SavingThrows : _.Index<S.Ability, InlineMod>;
    }
    Race : S.Race;
    // Class ?: S.Class;
}

function InlineToMod<A extends S.Ability, S extends S.Ability.Skill<A>>(Ability : A | S, Data : InlineMod) : S.Ability.AbilityScore<A, S> {
    if(typeof Data === "number") {
        /// Raw score.
        return D.Ability.Score.$<A, S>(Ability)(D.Ability.Score.Raw(Data));
    } else {
        return D.Ability.Score.$<A, S>(Ability)({...D.Ability.Score.Modifier(Data.Modifier), ...(Data.Raw ? {Raw : Data.Raw} : {})});
    }
}

function entityGenerator(
    Data : EntityGenParams
) : S.Entity {
    return {
        _: "SRD.ENTITY",
        Name : Data.Name,
        Race : Data.Race,
        Class: [],
        Actions: [],
        Inventory : {_: "SRD.ENTITY.INVENTORY" , Currencies: [], Weight: 0, Items: []},
        Features: [],
        Stats : {
            Abilities : function<A extends S.Ability>(Ability : A) {
                return InlineToMod(Ability, Data.Stats.Abilities[Ability._]) as S.Ability.AbilityScore<A, never>;
            },
            Skills : function<A extends S.Ability, S extends S.Ability.Skill<A>>(Skill : S) {
                return (Data.Stats.Skills[Skill._] ? InlineToMod(Skill, Data.Stats.Skills[Skill._]) 
                                                    : InlineToMod(Skill, Data.Stats.Abilities[Skill.Ability._])) as S.Ability.AbilityScore<A, S> | S.Ability.AbilityScore<A, never>;
            },
            SavingThrows : function<A extends S.Ability>(Ability : A) {
                return (Data.Stats.SavingThrows[Ability._] ?
                        InlineToMod(Ability, Data.Stats.SavingThrows[Ability._])
                        : InlineToMod(Ability, Data.Stats.Abilities[Ability._])) as S.Ability.AbilityScore<A, never>;
            },
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
            const d20Res = Math.floor(Math.random() * 20) + 1;
            console.log(`Making ${Check.Property.Name} check ${Check.DC ? `with DC ${Check.DC}` : ""}!`);
    
            const Value = d20Res + stat.Score.Modifier;
            return {
                Property: Check.Property,
                Value,
                Raw  : d20Res,
                Modifiers : [{Source: [Reference.TEXT(`Calculated from ${stat.Property.Name} score.`)], Value: stat.Score.Modifier}],
                ...(Check.DC ? {Pass: Value >= Check.DC} : {}),
                ...(d20Res === 1 ? {Critical : "FAILURE"} : {}),
                ...(d20Res === 20 ? {Critical : "SUCCESS"} : {}),
            };
    
        },
        async Save(Save) {
            let stat = this.Stats.SavingThrows(Save.Ability);

            // TODO: Replace with Dice.Roll()
            const d20Res = Math.floor(Math.random() * 20) + 1;
            console.log(`Making save with DC ${Save.DC} !`);

            const Value = d20Res + stat.Score.Modifier;

            const result : S.Ability.Save.Result<typeof Save.Ability> = {
                Save,
                Value,
                Raw  : d20Res,
                Modifiers : [{Source: [Reference.TEXT(`Calculated from ${stat.Property.Name} score.`)], Value: stat.Score.Modifier}],
                ...(Save.DC ? {Pass: Value >= Save.DC} : {}),
                ...(d20Res === 1 ? {Critical : "FAILURE"} : {}),
                ...(d20Res === 20 ? {Critical : "SUCCESS"} : {}),
            }
            return result;
        }
    }
}
const RAW = D.Ability.Score.Raw;



const testEntity = entityGenerator({
    Name : "Knight",
    Race : undefined as unknown as S.Race,
    Stats: {
        Abilities: {
            [`${STR}`] : 16,
            [`${DEX}`] : 11,
            [`${CON}`] : 14,
            [`${INT}`] : 11,
            [`${WIS}`] : 11,
            [`${CHA}`] : 15,
            
            /// Or:
            /// [STR] : 16
            ///         Is able to be used in vanilla JS, but not TS (@_@)
        },
        SavingThrows: {
            [`${CON}`] : { Modifier : +4 },
            [`${WIS}`] : { Modifier : +2 },
        },
        Skills: {  },
    },
});

// Make them do a check...
const testCheck = D.Ability.Check(STR, { DC : 15 } );

new Array(20).fill(0).forEach(() => testEntity.Check(testCheck).then(console.log));

// Test 
const testSave  = D.Ability.Save (CON, { DC : 15 } );

new Array(20).fill(0).forEach(() => testEntity.Save(testSave).then(console.log));
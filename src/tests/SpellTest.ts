import { DND_5E as D } from "../5E";
import { System as S, Reference } from "../System";

const Moonbeam : S.Spell<any> = {
    _: "SRD.SPELL.MOONBEAM",
    Name: "Moonbeam",
    CastingTime: D.Spell.Duration.CONCENTRATION( D.Unit.Time.MINUTES(1) ),
    Range: D.Spell.Range.STATIC( D.Unit.Distance.FEET(120) ),
    Area: D.Spell.Area.CYLINDER( D.Unit.Distance.FEET(5) ),
    School: D.Spell.School.EVOCATION,
    References: [ Reference.WEBSITE({ URL: "https://www.dndbeyond.com/spells/moonbeam" }) ],
    Components: [
        D.Spell.Component.VERBAL(),
        D.Spell.Component.SOMANTIC(),
        D.Spell.Component.MATERIAL(
            `several seeds of any moonseed plant
            and a piece of opalescent feldspar`
        )
    ],
    Levels: D.Spell.Levels.Scale({
        Data : {
            Damage : { 
                Die: "d10",
                Amount: 1
            }
        },
        Start: 2,
        Higher: function(lvl) {
            // Give an extra d10 radiant damage for every level over 2nd.
            this.Damage.Amount += lvl - 2;
            return this;
        },
        Executor: function(...targets) {
            // this.Damage.Amount will now give the appropriate number of dice,
            //      based on the Higher function's modifications.
            console.log(`${this.Damage.Amount}${this.Damage.Die} damage`)
        }
    })
};

let a = Moonbeam.Levels[5](); // Should print "4d10 damage" 
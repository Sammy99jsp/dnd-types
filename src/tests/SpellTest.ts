import { DND_5E as D } from "../5E";
import { System as S, Reference } from "../System";

/**
 * An implementation of the basics of the Moonbeam spell.
 * 
 * As you can (hopefully) see, the aim is to make the process as declarative as possible,
 *      (possibly at the expense of extra verbosity).
 */
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
            // Mainly use this for values that change dependent on the level. 
            Damage : { 
                Die: "d10",
                Amount: 1,
                Type : "radiant" /// TODO: Damage Types.
            }
        },

        Start: 2,  // Available from 2nd-level.

        Higher: function(lvl) { 
            // The 'this' context is the same 'Data' object we defined above
            //      (but not a reference to the original — It's nice and fresh for us to modify).
            
        
            // Give an extra d10 radiant damage for every level over 2nd.
            this.Damage.Amount += lvl - 2;
            return this;
        },

        // Function that does the actual 'meat' of the spell.
        Executor: function(...targets) {
            // this.Damage.Amount will now give the appropriate number of dice,
            //      based on the Higher function's modifications.
            console.log(`${this.Damage.Amount}${this.Damage.Die} damage`)
        }
    })
};

let a = Moonbeam.Levels[5](); // Should print "4d10 damage" 
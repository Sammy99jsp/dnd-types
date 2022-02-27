import { DND_5E as D } from "../5E";
import { Reference, System } from "../System";

const Race : System.Race = {
    _   : "SRD.RACE.DRAGONBORN",
    Name: "Dragonborn",

    Details : {
        _: "SRD.RACE.DETAILS",
        Age : {
            Adult: 15,
            Lifespan : 80,

            Description: `Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.`
        },

        Alignment : `Chaotic Good`,

        Size: D.Entity.Size.TINY,
    },
    References : [Reference.WEBSITE({ URL : "https://www.dandwiki.com/wiki/5e_SRD:Dragonborn" })],
    Features   : [
        {
            _  : "SRD.FEATURE.RACE.DRAGONBORN.BREATH_WEAPON",
            Name: "Breath Weapon",
            Source: {
                Name: "Race",
                SourceID: "SRD.RACE.DRAGONBORN"
            },
            Init: function(Source, Parameters) {
                console.log(this);
            }
            
        }
    ]
}

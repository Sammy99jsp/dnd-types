import { System as S, Reference, Utils } from "./System";

/**
 * Actual 5E SRD content
 */
export namespace DND_5E {
    export namespace Unit {
        export namespace Distance {
            const _FEET : Utils.Unit.Distance = {
                _: "UTILS.UNIT.DISTANCE",
                Name: "Feet",
                Symbol: "ft.",
                Position: 1,
            }

            export const FEET : <V extends string | number>(Value : V) => Utils.UnitValue<Utils.Unit.Distance, V> = (Value) =>  ({Unit : _FEET, Value});
        }

        export namespace Time {
            const _SECONDS : Utils.Unit.Time = {
                _: "UTILS.UNIT.TIME",
                Name: "Seconds",
                Symbol: "secs",
                Position: 1,
            }

            export const SECONDS : <V extends string | number>(Value : V) => Utils.UnitValue<Utils.Unit.Time, V> = (Value) =>  ({Unit : _SECONDS, Value});


            const _MINUTES : Utils.Unit.Time = {
                _: "UTILS.UNIT.TIME",
                Name: "Minutes",
                Symbol: "mins",
                Position: 1,
            }

            export const MINUTES : <V extends string | number>(Value : V) => Utils.UnitValue<Utils.Unit.Time, V> = (Value) =>  ({Unit : _MINUTES, Value});


            const _HOURS : Utils.Unit.Time = {
                _: "UTILS.UNIT.TIME",
                Name: "Hours",
                Symbol: "hrs",
                Position: 1,
            }

            export const HOURS : <V extends string | number>(Value : V) => Utils.UnitValue<Utils.Unit.Time, V> = (Value) =>  ({Unit : _HOURS, Value});

            const _DAYS : Utils.Unit.Time = {
                _: "UTILS.UNIT.TIME",
                Name: "Days",
                Symbol: "days",
                Position: 1,
            }

            export const DAYS : <V extends string | number>(Value : V) => Utils.UnitValue<Utils.Unit.Time, V> = (Value) =>  ({Unit : _DAYS, Value});

            const _ROUNDS : Utils.Unit.Time = {
                _: "UTILS.UNIT.TIME",
                Name: "Rounds",
                Symbol: "rounds",
                Position: 1,
            }

            export const ROUNDS : <V extends string | number>(Value : V) => Utils.UnitValue<Utils.Unit.Time, V> = (Value) =>  ({Unit : _ROUNDS, Value});

        }
    }

    export namespace Spell {
        export namespace Range {
            interface Self extends S.Spell.Range {
                _: "SRD.SPELL.RANGE.SELF";
                Size: "Self";
            }

            export const SELF : () => Self = () => ({
                _: "SRD.SPELL.RANGE.SELF",
                Size: "Self"
            });

            interface Touch extends S.Spell.Range {
                _: "SRD.SPELL.RANGE.TOUCH";
                Size: "Touch";
            }

            export const TOUCH : () => Touch = () => ({
                _: "SRD.SPELL.RANGE.TOUCH",
                Size: "Touch"
            });

            interface Static extends S.Spell.Range {
                _: "SRD.SPELL.RANGE.STATIC";
                Size: Utils.UnitValue<Utils.Unit.Distance, number | string>;
            }

            export const STATIC: (Size : Utils.UnitValue<Utils.Unit.Distance, number | string>) => Static = (Size) => ({
                _: "SRD.SPELL.RANGE.STATIC",
                Size
            });

        }

        export namespace Component {
            interface V extends S.Spell.Component {
                _           : "SRD.SPELL.COMPONENT.VERBAL",
                Initial     : "V",
                Name        : "Verbal",
                References  : Reference[]
            };

            /**
             * @param Extra Any additional information relevant to this component. 
             */
            export const VERBAL : (Extra ?: string) => V = (Extra) => ({
                _: "SRD.SPELL.COMPONENT.VERBAL",
                Initial: "V",
                Name: "Verbal",
                References: [Reference.WEBSITE({URL : "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Verbal_.28V.29"})],
                Extra
            });


            interface S extends S.Spell.Component {
                _           : "SRD.SPELL.COMPONENT.SOMANTIC",
                Initial     : "S",
                Name        : "Somantic",
                References  : Reference[]
            };

            /**
             * @param Extra Any additional information relevant to this component. 
             */
            export const SOMANTIC : (Extra ?: string) => S = (Extra) => ({
                _: "SRD.SPELL.COMPONENT.SOMANTIC",
                Initial: "S",
                Name: "Somantic",
                References: [Reference.WEBSITE({URL : "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Somatic_.28S.29"})],
                Extra
            });


            interface M extends S.Spell.Component {
                _           : "SRD.SPELL.COMPONENT.MATERIAL",
                Initial     : "M",
                Name        : "Material",
                References  : Reference[]
            };

            /**
             * @param Extra Any additional information relevant to this component. 
             */
            export const MATERIAL : (Extra ?: string) => M = (Extra) => ({
                _: "SRD.SPELL.COMPONENT.MATERIAL",
                Initial: "M",
                Name: "Material",
                References: [Reference.WEBSITE({URL : "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Material_.28M.29"})],
                Extra
            });
        }

        export namespace Duration {
            /// Instantaneous
            
            /**
             * Spells that are immeadiately cast:
             * [Wiki](https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous)
             */
            export interface Instantaneous extends S.Spell.Duration {
                _           : "SRD.SPELL.DURATION.INSTANTANEOUS",
                References  : Reference[]
            };

            export const INSTANTANEOUS: () => Instantaneous = () => ({
                _           : "SRD.SPELL.DURATION.INSTANTANEOUS",
                References  : [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous"})],
            });

            /// Concentration

            export interface Concentration extends S.Spell.Duration {
                _           : "SRD.SPELL.DURATION.CONCENTRATION",
                References  : Reference[],
            }

            /**
             * Generates detail for a concentration spell.
             * // TODO: Look again,.
             */
            export const CONCENTRATION : <U extends Utils.Unit, V extends string | number>(MaxDuration : Utils.UnitValue<U, V>) => Concentration = (MaxDuration) => ({
                _           : "SRD.SPELL.DURATION.CONCENTRATION",
                References : [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Concentration"})],
                MaxDuration,
            });

            /// Action

            export interface Action extends S.Spell.Duration {
                _           : "SRD.SPELL.DURATION.ACTION",
                References  : Reference[],
            }

            export const ACTION : () => Action = () => ({
                _           :  "SRD.SPELL.DURATION.ACTION",
                References  :  [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous#Casting_Time"})]
            });

            /// Bonus Action

            export interface BonusAction extends S.Spell.Duration {
                _           : "SRD.SPELL.DURATION.BONUS_ACTION",
                References  : Reference[],
            }

            export const BONUS_ACTION: () => BonusAction = () => ({
                _           : "SRD.SPELL.DURATION.BONUS_ACTION",
                References  : [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous#Bonus_Action"})],
            });

            /// Reaction

            export interface Reaction extends S.Spell.Duration {
                _           : "SRD.SPELL.DURATION.REACTION",
                References  : Reference[],
            }

            export const REACTION: () => Reaction = () => ({
                _: "SRD.SPELL.DURATION.REACTION",
                References  : [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous#Reactions"})]
            });

            // Flat (Static) amount Time

            export interface Static extends S.Spell.Duration {
                _: "SRD.SPELL.DURATION.STATIC",

                References ?: Reference[],

                Duration    : Utils.UnitValue<Utils.Unit.Time, number | string>;
            }

            export const STATIC : ({Duration} : {Duration : Utils.UnitValue<Utils.Unit.Time, number | string>}) => Static = ({Duration}) => ({
                _: "SRD.SPELL.DURATION.STATIC",
                References : [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous#Duration"})],
                Duration,
            })  
        }

        export namespace School {
            export const ABJURATION : S.Spell.School = {
                _: "SRD.SPELL.SCHOOL.ABJURATION",
                Name : "Abjuration",
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/SRD:Abjuration_School"})]
            };
            export const CONJURATION : S.Spell.School = {
                _: "SRD.SPELL.SCHOOL.CONJURATION",
                Name : "Conjuration",
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/SRD:Conjuration_School"})]
            };
            export const DIVINATION : S.Spell.School = {
                _: "SRD.SPELL.SCHOOL.DIVINATION",
                Name : "Divination",
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/SRD:Divination_School"})]
            };
            export const ENCHANTMENT : S.Spell.School = {
                _: "SRD.SPELL.SCHOOL.ENCHANTMENT",
                Name : "Enchantment",
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/SRD:Enchantment_School"})]
            };
            export const EVOCATION : S.Spell.School = {
                _: "SRD.SPELL.SCHOOL.EVOCATION",
                Name : "Evocation",
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/SRD:Evocation_School"})]
            };
            export const ILLUSION : S.Spell.School = {
                _: "SRD.SPELL.SCHOOL.ILLUSION",
                Name : "Illusion",
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/SRD:Illusion_School"})]
            };
            export const NECROMANCY : S.Spell.School = {
                _: "SRD.SPELL.SCHOOL.NECROMANCY",
                Name : "Necromancy",
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/SRD:Necromancy_School"})]
            };
            export const TRANSMUTATION : S.Spell.School = {
                _: "SRD.SPELL.SCHOOL.TRANSMUTATION",
                Name : "Transmutation",
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/SRD:Transmutation_School"})]
            };
            export const UNIVERSAL : S.Spell.School = {
                _: "SRD.SPELL.SCHOOL.UNIVERSAL",
                Name : "Universal",
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/SRD:Universal_School"})]
            };
        }

        export namespace Area {
            export interface Cone {
                _: "SRD.SPELL.AREA.CONE";
                Name: "Cone";
                Size : Utils.UnitValue<Utils.Unit.Distance, number | string>;
                References: Reference[];
            }

            export const CONE : (Size : Utils.UnitValue<Utils.Unit.Distance, number | string>) => Cone = (Size) => ({
                _: "SRD.SPELL.AREA.CONE",
                Name: "Cone",
                Size,
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous#Cone"})]
            });
                
            export interface Cube {
                _: "SRD.SPELL.AREA.CUBE";
                Name: "Cube";
                Size : Utils.UnitValue<Utils.Unit.Distance, number | string>;
                References: Reference[];
            }

            export const CUBE : (Size : Utils.UnitValue<Utils.Unit.Distance, number | string>) => Cube = (Size) => ({
                _: "SRD.SPELL.AREA.CUBE",
                Name: "Cube",
                Size,
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous#Cube"})]
            });

            export interface Cylinder {
                _: "SRD.SPELL.AREA.CYLINDER";
                Name: "Cylinder";
                Size : Utils.UnitValue<Utils.Unit.Distance, number | string>;
                References: Reference[];
            }

            export const CYLINDER : (Size : Utils.UnitValue<Utils.Unit.Distance, number | string>) => Cylinder = (Size) => ({
                _: "SRD.SPELL.AREA.CYLINDER",
                Name: "Cylinder",
                Size,
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous#Cylinder"})]
            });

            export interface Line {
                _: "SRD.SPELL.AREA.LINE";
                Name: "Line";
                Size : Utils.UnitValue<Utils.Unit.Distance, number | string>;
                References: Reference[];
            }

            export const LINE : (Size : Utils.UnitValue<Utils.Unit.Distance, number | string>) => Line = (Size) => ({
                _: "SRD.SPELL.AREA.LINE",
                Name: "Line",
                Size,
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous#Line"})]
            });

            export interface Sphere {
                _: "SRD.SPELL.AREA.SPHERE";
                Name: "Sphere";
                Size : Utils.UnitValue<Utils.Unit.Distance, number | string>;
                References: Reference[];
            }

            export const SPHERE : (Size : Utils.UnitValue<Utils.Unit.Distance, number | string>) => Sphere = (Size) => ({
                _: "SRD.SPELL.AREA.SPHERE",
                Name: "Sphere",
                Size,
                References: [Reference.WEBSITE({URL: "https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Instantaneous#Sphere"})]
            })
        }

        // Helps with defining a spell
        export namespace Levels {
            interface LevelScaleParams<T extends S.Spell.DataStruct> {
                Available   ?: number[],
                Start       ?: number,
                End         ?: number,
                Higher       : (this: T, lvl : number) => T,
                Executor     : (this: T, ...Targets : S.Spell.Targets) => void,
                Data         : T
            }
            /**
             * Defines the functionality of a spell (including at higher levels).
             * 
             * @param Data A shared object that is used to execute the spell.
             * @param Higher A function that alters {@link Data} for higher levels.
             * 
             */
            export const Scale :
                <T extends S.Spell.DataStruct>(
                    {Data, Start, Higher, End, Available, Executor} : 
                    LevelScaleParams<T>
                ) => S.Spell.Levels<T> = <T>(
                    {Start, Higher, End, Available, Executor, Data} :
                    LevelScaleParams<T>
                ) => {

                    // A fresh Data object to do our magic on.
                    const temp = {...Data};

                    // Get the range of available levels for this spell.
                    let range : number[]; 
                    if(Available) {
                        Available.sort();
                        Start = Available[0];
                        End = Available[Available.length - 1];
                        range = Available;
                    } else {
                        // Make the range of available levels between Start and End (both inclusive).
                        range = new Array(((End ?? 9) + 1) - (Start ?? 0))
                            .fill(0).map((_e, i) => i + (Start ?? 0));
                    }

                    Start ??= 0;
                    End   ??= 9;

                    // Proxy magic
                    const handler = {
                        get : (targetObj : any, prop : string | number | symbol, receiver : any) => {
                            // Gets all available levels through use of JS' iterator API.
                            if(prop ===  Symbol.iterator) {
                                return function*() {
                                    for (let i of range) yield i;
                                }
                            }
                            if(typeof prop === "string") {
                                let lvl : number;
                                if(Number.isSafeInteger(parseInt(prop))) {
                                    lvl = parseInt(prop); 

                                    // You can access levels of a spell by treating the proxy as an array (e.g. Levels[0]) 
                                    if(lvl < (Start ?? 0) || lvl > (End ?? 9) || range.indexOf(lvl) === -1) {
                                        throw new Error("Outside casting level range of spell!");
                                    }

                                    if(lvl === (Start ?? 0)) {
                                        return (...targets : S.Spell.Targets) => Executor.call(targetObj, ...targets);
                                    }
        
                                    // Alter our Data object for a higher-level cast
                                    if(lvl <= (End ?? 9)) {
                                        return (...targets : S.Spell.Targets) => 
                                            Executor.call(
                                                Higher.call({...targetObj}, lvl),
                                                ...targets
                                            );
                                    }
                                }

                            }
                        }
                    }

                    const proxy = new Proxy(Data, handler);

                    return proxy as S.Spell.Levels<T>; 
                }
        }
    }

    export namespace Ability {
        export interface Strength extends S.Ability {
            _       : "SRD.ABILITY.STRENGTH";
            Name    : "Strength";
            Short   : "STR";
            References : Reference[];
        }

        export const STRENGTH : Strength = {
            _: "SRD.ABILITY.STRENGTH",
            Name: "Strength",
            Short: "STR",
            References: [Reference.WEBSITE({ URL: "https://www.dandwiki.com/wiki/5e_SRD:Strength"})]
        }; 

        export interface Dexterity extends S.Ability {
            _       : "SRD.ABILITY.DEXTERITY";
            Name    : "Dexterity";
            Short   : "DEX";
            References : Reference[];
        }

        export const DEXTERITY : Dexterity = {
            _       : "SRD.ABILITY.DEXTERITY",
            Name    : "Dexterity",
            Short   : "DEX",
            References : [Reference.WEBSITE({ URL: "https://www.dandwiki.com/wiki/5e_SRD:Dexterity" })]
        }; 

        export interface Constitution extends S.Ability {
            _       : "SRD.ABILITY.CONSTITUTION";
            Name    : "Constitution";
            Short   : "CON";
            References : Reference[];
        }

        export const CONSTITUTION : Constitution = {
            _       : "SRD.ABILITY.CONSTITUTION",
            Name    : "Constitution",
            Short   : "CON",
            References : [Reference.WEBSITE({ URL: "https://www.dandwiki.com/wiki/5e_SRD:Constitution" })]
        }; 

        export interface Intelligence extends S.Ability {
            _       : "SRD.ABILITY.INTELLIGENCE";
            Name    : "Intelligence";
            Short   : "INT";
            References : Reference[];
        }

        export const INTELLIGENCE : Intelligence = {
            _       : "SRD.ABILITY.INTELLIGENCE",
            Name    : "Intelligence",
            Short   : "INT",
            References : [Reference.WEBSITE({ URL: "https://www.dandwiki.com/wiki/5e_SRD:Intelligence"})]
        }; 

        export interface Wisdom extends S.Ability {
            _       : "SRD.ABILITY.WISDOM";
            Name    : "Wisdom";
            Short   : "WIS";
            References : Reference[];
        }

        export const WISDOM : Wisdom = {
            _       : "SRD.ABILITY.WISDOM",
            Name    : "Wisdom",
            Short   : "WIS",
            References : [Reference.WEBSITE({ URL: "https://www.dandwiki.com/wiki/5e_SRD:Wisdom"})]
        }; 

        export interface Charisma extends S.Ability {
            _       : "SRD.ABILITY.CHARISMA";
            Name    : "Charisma";
            Short   : "CHA";
            References : Reference[];
        }

        export const CHARISMA : Charisma = {
            _       : "SRD.ABILITY.CHARISMA",
            Name    : "Charisma",
            Short   : "CHA",
            References : [Reference.WEBSITE({ URL: "https://www.dandwiki.com/wiki/5e_SRD:Charisma" })]
        }; 

        const MakeScore = <A extends S.Ability>(Ability: A) => (
            (Score : S.Ability.Score) => ({Ability, Score})
        );

        export const STR = MakeScore(STRENGTH);
        export const DEX = MakeScore(DEXTERITY);
        export const CON = MakeScore(CONSTITUTION);
        export const INT = MakeScore(INTELLIGENCE);
        export const WIS = MakeScore(WISDOM);
        export const CHA = MakeScore(CHARISMA);

        export namespace Score {
            export const CalculateModifier = (Score : number) => Math.floor((Score - 10) / 2);
            
            export const RAW = (Raw : number) : S.Ability.Score => ({
                _: "SRD.ABILITY.SCORE",
                Score: Raw,
                Modifier : CalculateModifier(Raw), 
            });

            // TODO: Make a complete proxy, using an entity's racial and class features which can effect the score/modifier.

        }

        export namespace Skill {



            export namespace Proficiency {
                export const HALF_PROFICIENT: S.Ability.Skill.Proficiency = {
                    _   : `SRD.ABILITY.SKILL.PROFICIENCY.HALF_PROFICIENT`,
                    Name: "Half-proficient",
                    Action: function(ProficienyBonus) {
                        return Math.floor(ProficienyBonus / 2);
                    },
                    Reference: [Reference.WEBSITE({ URL: "https://www.dandwiki.com/wiki/Jack_of_All_Trades_(5e_Feat)" })]
                }

                export const PROFICIENT: S.Ability.Skill.Proficiency = {
                    _   : `SRD.ABILITY.SKILL.PROFICIENCY.PROFICIENT`,
                    Name: "Proficent",
                    Action: function(ProficiencyBonus) {
                        return Math.floor(ProficiencyBonus);
                    },
                    Reference: [Reference.WEBSITE({ URL: "https://www.dandwiki.com/wiki/5e_SRD:Proficiency_Bonus" })]
                }

                export const EXPERTISE: S.Ability.Skill.Proficiency = {
                    _   : `SRD.ABILITY.SKILL.PROFICIENCY.EXPERTISE`,
                    Name: "Expertise",
                    Action: function(ProficiencyBonus) {
                        return Math.floor(ProficiencyBonus * 2);
                    },
                    Reference: [Reference.WEBSITE({ URL: "https://www.dandwiki.com/wiki/5e_SRD:Rogue#Expertise" })]
                }
            }
        }
    }
}


/**
 * @decorator Shows
 */
function Computed() {}

/**
 * A namespaced ID for most objects.
 */
export interface _ {
    _: string
}

export namespace _ {
    export type Index<A extends _, B> = Record<A["_"], B>;
}

/**
 * The dollar sign ($) is a short hand for $torable objects,
 *  and which only store information.
 * 
 * They are often just more conscise versions of existing interfaces,
 *  whose objects which can be stored in a database, .json file, or similar.
 * 
 */
interface $ {}

// I wish Typescript had support for an int type :(
export type int = number;

export type ID = `${string}-${string}-4${string}-${string}-${string}`; // UUID v4

export namespace Utils {
    export interface Unit {
        _          : `UTILS.UNIT.${string}`;
    
        Symbol     : string;
        Name       : string;
    
        /**
         * Where does the unit go? Before (-1), or after (+1) the value?
         */
        Position   : -1 | 1;
    }
    
    export namespace Unit {
        export interface Distance extends Unit {
            _ : "UTILS.UNIT.DISTANCE"
        }
        export interface Currency extends Unit {
            _ : "UTILS.UNIT.CURRENCY"
        }
        export interface Time extends Unit {
            _ : "UTILS.UNIT.TIME"
        }

        /// Helper functions for defining new units.


        export const DISTANCE : ({Symbol, Name, Position} : {Symbol : string, Name : string, Position ?: -1 | 1}) => Distance = 
            ({Symbol, Name, Position}) => ({_ : "UTILS.UNIT.DISTANCE", Symbol, Name, Position : Position ?? 1});
    
        export const CURRENCY : ({Symbol, Name, Position} : {Symbol : string, Name : string, Position ?: -1 | 1}) => Currency = 
            ({Symbol, Name, Position}) => ({_ : "UTILS.UNIT.CURRENCY", Symbol, Name, Position : Position ?? 1});
    
        export const TIME     : ({Symbol, Name, Position} : {Symbol : string, Name : string, Position ?: -1 | 1}) => Time = 
            ({Symbol, Name, Position}) => ({_ : "UTILS.UNIT.TIME", Symbol, Name, Position : Position ?? 1});
    }

    // A unit-value pair
    
    export interface UnitValue<U extends Unit, V> {
        Unit : U,
        Value: V,
    }

    
}

/**
 * References — used to cite a source for a particular in-game property/object.
 */

export interface Reference extends _ {
    _ : `UTILS.REFERENCE.${string}`;
} 
// TODO: Add ability to get certain descriptions.
export namespace Reference {
    export interface Book extends Reference {
        _       : "UTILS.REFERENCE.BOOK";

        Title   : string;
        Page    ?: int;
        Section ?: string;
    }

    export interface Website extends Reference {
        _            : "UTILS.REFERENCE.WEBSITE";

        PageTitle   ?: string;
        WebsiteTitle?: string;
        URL          : string;
    }

    export interface Text extends Reference {
        _            : "UTILS.REFERENCE.TEXT";

        Content      : string;
    }

    
    export const WEBSITE = ({PageTitle, WebsiteTitle, URL} : {PageTitle?:string; WebsiteTitle?: string; URL: string;}) : Website =>
            ({_: "UTILS.REFERENCE.WEBSITE", PageTitle, WebsiteTitle, URL});

    export const BOOK = ({Title, Section, Page} : {Title :string; Section?: string; Page?: int;}) : Book =>
            ({_: "UTILS.REFERENCE.BOOK", Title, Section, Page});
        
    export const TEXT = (Content : string) : Text => ({_: "UTILS.REFERENCE.TEXT", Content});
}

export namespace System {


    export interface Movement extends _ {
        _   : `SRD.MOVEMENT.${string}`;
        Name: string;

        References ?: Reference[];
    }

    export namespace Movement {

    }
    

    export interface Size extends _ {
        _   : `SRD.SIZE.${string}`;
        Name: string;

        

        References?: Reference[];
    }
    

    export interface Ability extends _ {
        _: `SRD.ABILITY.${string}`;

        Name        : string;
        Short       : string;

        References ?: Reference[];
        [Symbol.toPrimitive] : (this: Ability, hint : "string" | "number" | "default") => string | number; 
        toString : (this : Ability) => string;
    }

    /**
     * Possibly add interfaces for custom dice notation parsers
     * 
     * Also, the folowing is quite cool:
     * 
     * https://sophiehoulden.com/dice/documentation/notation.html
     */

    export interface Die extends _ {
        _           : `SRD.DIE.${string}`;
        Name        : string;

        Min        ?: number;
        Max         : number;
        Multiplier ?: number;
    }


    export interface Dice extends _, Iterable<Die> {
        _ : "SRD.DICE";

        /**
         * 
         * Adds support for:
         * 
         * for await (const result of diceObj) {
         *      Do something with each roll.
         * }
         */

        [Symbol.asyncIterator]: IterableIterator<Dice>


    }

    export namespace Ability {

        export interface Skill<A extends Ability> extends _ {
            _       :   `SRD.ABILITY.SKILL.${string}`;
            Ability :   A;
            Name    :   string;
            References?:Reference[];
        }

        export namespace Skill {
            /**
             * For defining a type of proficiency such as:
             * 
             * [half-proficient](https://www.dandwiki.com/wiki/5e_SRD:Bard#Jack_of_All_Trades), [proficient](https://www.dandwiki.com/wiki/5e_SRD:Proficiency_Bonus), or [expertise](https://www.dandwiki.com/wiki/5e_SRD:Rogue#Expertise)
             */
            export interface Proficiency extends _ {
                _         :   `SRD.ABILITY.SKILL.PROFICIENCY.${string}`;

                Name      : string;
                Reference?: Reference[]; 

                /**
                 * Calculates altered proficiency bonus
                 */
                Action    : (this : Entity, ProficiencyBonus : int) => int;
            }

            export namespace Proficiency {
                export type $ = Proficiency["_"];
            }

            export interface $<A extends Ability> extends _ {
                _: `SRD.ABILITY.SKILL.${string}.$`;
                Ability : A["_"];
                Name    : string;
            }
        }  

        /**
         * A public-facing interface for an ability's score and modifier.
         * 
         * This will most likely be implemented as a JS proxy to
         * take into account any extra changes from other sources.
         */
        export interface Score extends _ {
            _        : `SRD.ABILITY.SCORE`
            Score    : int;
            Modifier : int; 
        }

        export namespace Score {
            /**
             * How an ability score is likely to be stored.
             */
            export interface $ extends _ {
                _         :     "SRD.ABILITY.SCORE.$";
                Raw       :     int;
                Override ?: {
                    Score    ?: int;
                    Modifier ?: int;
                }
            }
        }

        export interface AbilityScore<A extends Ability, S extends Skill<A>> {
            Property: A | S;
            Score   : Score;
        }

        export namespace AbilityScore {
            export interface $<A extends Ability> {
                Ability: A["_"];
                Score  : Score.$;
            }
        }

        export interface DifficultyClass<A extends Ability> extends _ {
            _   : "SRD.ABILITY.DIFFICULTY_CLASS";
            DC  : int;
            Ability : A;
        }

        export namespace DifficultyClass {
            export interface $<A extends Ability> extends _ {
                _   : `SRD.ABILITY.DIFFICULTY_CLASS.$`;
                DC  : int;
                /**
                 * Reference the _ (namespaced ID) of the ability.
                 */
                Ability : A["_"];
            }
        }

        // TODO: Has dis/advantage ??
          
        export interface Check<A extends Ability> extends _ {
            _        : "SRD.ABILITY.CHECK"
            Property : A | Skill<A>;
            Passive ?: boolean;
            DC      ?: int;
        }

        export namespace Check {
            export interface Result<A extends Ability> {
                Property : A | Skill<A>;

                /**
                 * Raw + All modifiers.
                 */
                Value    : int;

                Raw     : int;
                Modifiers : Modifier[];
                Pass   ?: boolean;
            }

            /**
             * TODO: Refactor the source bit.
             */
            export interface Modifier {
                Value : int;
                Source: Reference[]
            }
        }

        export interface Save<A extends Ability> extends _ {
            _       : "SRD.ABILITY.SAVE"
            Ability : A;
            DC     ?: int;
        }

        export namespace Save {
            export interface Result<A extends Ability> {
                Save : Save<A>;

                /**
                 * Raw + All modifiers.
                 */
                Value    : int;

                Raw          : int;
                Modifiers    : Modifier[];
                Pass        ?: boolean;

                Critical ?: "SUCCESS" | "FAILURE"
            }

            /**
             * TODO: Refactor the source bit.
             */
            export interface Modifier {
                Value : int;
                Source: Reference[]
            }
        }
        
        
    }

    export interface Feature<S extends Feature.Source<_>> extends _ {
        _  : `SRD.FEATURE.${string}`;

        /**
         * The name of the specific feature.
         */
        Name: string,

        /**
         * The source of this Feature (e.g. Racial Trait, Class, Magical Item, Spell, etc.)
         */
        Source : S;

        /**
         * A desccription of this feature.
         */
        Description ?: string;

        /**
         * Callback when first loaded.
         */
        Init : (this : Entity, Source: S, Parameters : Record<string, any>) => void;

        References ?: Reference[];
    }

    export namespace Feature {
        export interface Source<S extends _> {
            Name : string;
            SourceID : S["_"];
        }
    }

    

    /**
     * See [wiki](https://www.dandwiki.com/wiki/5e_SRD:About_Races)
     */

    export interface Race extends _ {
        _       : `SRD.RACE.${string}`;

        Name    : string;

        Parent ?: Race['_'];

        Details : Race.Details;

        Features: Feature<Race.RacialFeature>[];

        References: Reference[]; 
    }

    export namespace Race {

        /// Acts as storage for various choices the player may have to make
        ///     when creating their character.
        export interface Store {
            Choices : Record<string, any>;
        }

        export interface RacialFeature extends Feature.Source<Race> {
            Name : "Race";
        }

        export interface Details extends _ {
            _       : `SRD.RACE.DETAILS`;
            Age     : Details.Age;

            /**
             * TODO: Add this!
             */
            Alignment : unknown;

            Size      : Size;


        }

        export namespace Details {
            export interface Description {
                Description ?: string;
            }
            /**
             * Contains age details of a race. See [Wiki](https://www.dandwiki.com/wiki/5e_SRD:About_Races#Age)
             */
            export interface Age extends Description {
                Adult    : int;
                Lifespan : int;
    
                Description ?: string;
            }

            export interface Size<S extends System.Size> extends Description {
                Size : S;
                Description ?: string;
            }
        }
    }

    /**
     * An interface that contains the pure information about a class.
     * 
     * (Does not store any data of an implementation)
     * 
     */
    export interface Class extends _ {
        _           : `SRD.CLASS.${string}`;
        Name        : string;

        References ?: Reference[];

        /**
         * Calculates the 
         */
        HitDice     : (Level : number) => Dice[];
    }

    export namespace Class {

    }

    export interface Entity extends _ {
        _       : "SRD.ENTITY";
        
        Name    : string;

        Race    : Race;
        Class   : unknown[];

        /**
         * The entity's stat block.
         */
        Stats   : Entity.StatBlock;
        
        /**
         * @computed This will be calculated from Entity.Features[].
         **/ 
        // Speed   : Entity.SpeedBlock;

        /**
         * @computed
         */
        Actions : Combat.Action[];

        Features: [];

        Inventory: Entity.Inventory;


        //// FUNCTIONS — these all have 'this' as the entity itself — OOP FTW !



        /**
         * Make a check.
         */
        Check<A extends Ability>(this: Entity, Check : Ability.Check<A>) : Promise<Ability.Check.Result<A>>;
        /// TODO: Add a proper return type here which can provide an appropriate response.

        /**
         * Make a save.
         */
        Save<A extends Ability>(this : Entity, Save : Ability.Save<A>) : Promise<Ability.Save.Result<A>>;
        /// TODO: Add a proper return type here which can provide an appropriate response.


    }

    export namespace Entity {
        export interface Inventory extends _ {
            _       : `SRD.ENTITY.INVENTORY`
            /**
             * @computed The combined weight of all the items in the entity's inventory.
             */
            Weight  : number; 

            /// TODO: Add item type.
            Items   : unknown[];

            /// TODO: Currency
            Currencies: Utils.UnitValue<Utils.Unit.Currency, number>[];

        }

        export interface StatBlock {
            Abilities<A extends System.Ability>(Ability: A) : System.Ability.AbilityScore<A, never>;
            Skills<A extends System.Ability, S extends System.Ability.Skill<A>>(Skill: S) : Ability.AbilityScore<A, S> | Ability.AbilityScore<A, never>;
            SavingThrows<A extends System.Ability>(Ability: A) : System.Ability.AbilityScore<A, never>;
        }

        export namespace Stats {
            
        }
    }

    /**
     * Consult Wiki:
     *      [About Spells](https://www.dandwiki.com/wiki/5e_SRD:About_Spells),
     *      [Casting a Spell](https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell)
     */
    export interface Spell<LVL extends Spell.DataStruct> extends _ {
        _       : `SRD.SPELL.${string}`;

        Name    : string;

        Components : Spell.Component[];
        School  : Spell.School;

        CastingTime: Spell.Duration;

        Range   : Spell.Range;
        Area   ?: Spell.Area;

        References?: Reference[];


        /**
         * Spell level block.
         * 
         * {@link Spell.Levels}
         */
        Levels  : Spell.Levels<LVL>;

        Ritual ?: boolean;


    }

    export namespace Spell {
        export type DataStruct = Record<string, any>;
        export interface Range extends _ {
            _   : `SRD.SPELL.RANGE.${string}`;

            Size : string | Utils.UnitValue<Utils.Unit.Distance, number | string>;
        }

        export interface Area extends _ {
            _   : `SRD.SPELL.AREA.${string}`,

            Name: string,
            References ?: Reference[],

            Size : Utils.UnitValue<Utils.Unit.Distance, number | string>;
        }

        export interface School extends _ {
            _   : `SRD.SPELL.SCHOOL.${string}`

            Name        : string,
            References ?: Reference[];
        }

        export interface Duration extends _ {
            _ : `SRD.SPELL.DURATION.${string}`;

            References ?: Reference[];

            /**
             * Maximum time the spell can take (for concentration).
             */
            MaxDuration    ?: Utils.UnitValue<Utils.Unit, number | string>;

            Duration       ?: Utils.UnitValue<Utils.Unit, number | string>;
        }

        // TODO: Change
        export type Targets = Entity[];

        
        /**
         * Handles casting levels for a spell,
         * 
         * Iterate over the object to see all available levels.
         */
        export interface Levels<T extends DataStruct> extends _, Iterable<number> {
            _           : "SRD.SPELL.LEVELS";
            /**
             * Access the spell at a particular level using the level as an index.
             * Returns undefined if the level is not available at that level.
             * @param targets Target entities for this spell.
             */
            [level : number] : (this: T, ...targets: Targets) => void;
        }

        /**
         * See [Spell Components — DandDWiki.com](https://www.dandwiki.com/wiki/5e_SRD:Casting_a_Spell#Components).
         */
        export interface Component extends _ {
            _           :   `SRD.SPELL.COMPONENT.${string}`;

            /**
             * Any additional information (for example, extra restrictions [*] )
             */
            Extra      ?:   string;
            /**
             * One letter inital of the component.
             */
            Initial     :   string;
            Name        :   string;



            References ?:   Reference[];
        }
    }

    export interface Combat {
        Round      : int;
        /**
         * Whose turn is it in Combat.Order ?
         */
        Turn       : int;
        
        Initiative : Combat.Member<Entity>[];

        /**
         * @computed Should be implemented as a getter.
         */
        Order      : Entity[];
    }

    export namespace Combat {
        export interface Member<E extends Entity> {
            Initiative : int;
            Entity     : E;
        }

        export interface Action extends _ {
            _        : `SRD.ACTION.${string}`;

            Name     :  string;
            Type     :  Action.Type;

            Duration :  Action.Duration;
        }

        export namespace Action {
            export type Type = `SRD.ACTION.ATTACK` | `SRD.ACTION.OTHER`;

            /**
             * TODO: Merge with {@link Spell.Duration}
             */
            export interface Duration {
                _       :   `SRD.COMBAT.DURATION.${string}`;
                Name    :   string;
            }
        }

    }

    export interface Damage extends _ {
        _   : `SRD.DAMAGE.${string}`;
        Name: string;
    }

    export namespace Damage {
        export interface Value<D extends Damage, S extends Damage.Source<SourceType>> extends _ {
            _      : `SRD.DAMAGE.$VALUE`
            Type : D;
            Amount : number;
            Source : S;
        }

        export enum SourceType {
            ENVIRONMENT = "SRD.DAMAGE.@SOURCE.ENVIRONMENT",
            NON_MAGICAL = "SRD.DAMAGE.@SOURCE.NON_MAGICAL",
            MAGICAL = "SRD.DAMAGE.@SOURCE.MAGICAL"
        }

        /**
         * Where the damage was dealt from.
         */
        export interface Source<T extends SourceType> {
            _ : T;
            Details ?: SourceDetails[T];
        }

        interface SourceDetails {
            [SourceType.ENVIRONMENT]: string;
            [SourceType.MAGICAL] : unknown;   // TODO: Come back -- add a casted spell interface.
            [SourceType.NON_MAGICAL] : unknown; /// TODO: Reference to entity that dealt the damage, and weapon, etc.
        }
    }

    export interface Event<T extends Event.Target, D extends {}> {
        _   : `SRD.EVENT.${string}`;
        
        /**
         * A friendly PascalCase name for the event,
         * e.g. EntityDamageEvent.
         */
        FriendlyName : string;

        Target : T;

        Data : D;

        /// METHODS

        Handlers<D extends {}> () : Event.Handler<System.Event.Target, D>[];

        Cancel () : void;
        isCancelled () : boolean;

        /**
         * Returns a new Event object with the same data.
         */
        Clone() : Event<T, D>;

    }

    export namespace Event {
        /**
         * Anything that can handle events (mainly Entity interface)
         */
        export interface Target {
            // Use this for storing any data
            Data : any;
            Handlers<D extends {}, E extends Event<Target, D>>(event : E) : Event.Handler<Target, D>[];
        }

        /**
         * An event handler is actually a function, with extra properties that describe itself.
         */
        export interface Handler<T extends Event.Target, D extends {}> {
            /**
             * An ID that identifies the type of event the handler listeners.
             */
            _   : `${System.Event<T, D>["_"]}.HANDLER`;
            /**
             * Priority of the handler (Lowest = More important).
             * 
             * Default: 100 
             */
            Priority ?: number; 
            /**
             * The callback function for when this event is fired.
             */
            <D>(this : T, event : System.Event<T, D>) : void;
        } 
    }
}
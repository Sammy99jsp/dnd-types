/**
 * Namespace interface.
 */
interface _ {
    _: string
}

export type int = number;

export type ID = `${string}-${string}-4${string}-${string}-${string}`;

export interface Reference extends _ {
    _ : `UTILS.REFERENCE.${string}`;
} 

export namespace Utils {

    export interface Unit {
        _          : `UTILS.UNIT.${string}`;
    
        Symbol     : string;
        Name       : string;
    
        /**
         * Where does the unit go? Before (-1), or after (+1);
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
        export const DISTANCE : ({Symbol, Name, Position} : {Symbol : string, Name : string, Position ?: -1 | 1}) => Distance = 
            ({Symbol, Name, Position}) => ({_ : "UTILS.UNIT.DISTANCE", Symbol, Name, Position : Position ?? 1});
    
        export const CURRENCY : ({Symbol, Name, Position} : {Symbol : string, Name : string, Position ?: -1 | 1}) => Currency = 
            ({Symbol, Name, Position}) => ({_ : "UTILS.UNIT.CURRENCY", Symbol, Name, Position : Position ?? 1});
    
        export const TIME     : ({Symbol, Name, Position} : {Symbol : string, Name : string, Position ?: -1 | 1}) => Time = 
            ({Symbol, Name, Position}) => ({_ : "UTILS.UNIT.TIME", Symbol, Name, Position : Position ?? 1});
    }
    
    export interface UnitValue<U extends Unit, V> {
        Unit : U,
        Value: V,
    }
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

    
    export const WEBSITE = ({PageTitle, WebsiteTitle, URL} : {PageTitle?:string; WebsiteTitle?: string; URL: string;}) : Website =>
            ({_: "UTILS.REFERENCE.WEBSITE", PageTitle, WebsiteTitle, URL});

    export const BOOK = ({Title, Section, Page} : {Title :string; Section?: string; Page?: int;}) : Book =>
            ({_: "UTILS.REFERENCE.BOOK", Title, Section, Page});
}

export namespace System {
    export interface Entity extends _ {
        _       : "SRD.ENTITY";
        
        ID      : ID;
        Name    : string;

        Race    : unknown;
        Class   : unknown[];
    }

    export namespace Entity {

    }

    /**
     * Consult:
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
            _        : "SRD.SPELL.LEVELS";
            /**
             * Access the spell at a particular level using the level as an index.
             * Returns undefined if the level is not available at that level.
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
}
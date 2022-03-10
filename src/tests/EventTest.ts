import { assert } from "console";
import { ID, System } from "../System";
import { System as S } from "../system/Event";
const DEFAULT_PRIORITY = 100;
class Event<T extends S.Event.Target, D extends {}> implements S.Event<T, D> {
    // CONSTANTS

    public Target: T;
    public Data : D;
    
    // MEMBERS
    
    private id : string;
    private name: string;
    private cancelled : boolean = false;
    
    constructor({ ID, Name, Target, Data }: { ID : string, Name : string, Target : T, Data : D}) {
        this.id = ID;
        this.name = Name;
        this.Target = Target;
        this.Data = Data;

        this.Trigger();
    } 

    private Trigger() : void {
        const tmp = this.Handlers().sort((a, b) => (a.Priority ?? 100) - (b.Priority ?? 100));
        for (const handler of tmp) {
            if(this.cancelled) break;
            handler.call(this.Target, this);
        }
    }

    get _() : S.Event<T, D>["_"] {
        return `SRD.EVENT.${this.id}`;
    }

    get FriendlyName() : string {
        return this.name;
    }

    public isCancelled(): boolean {
        return this.cancelled;
    }

    public Cancel(): void {
        this.cancelled = true;
    }

    public Clone() : S.Event<T, D> {
        return new Event({ID: this.id, Name : this.name, Target : this.Target, Data : this.Data });
    }

    public Handlers<D extends {}>(): S.Event.Handler<S.Event.Target, D>[] {
        return this.Target.Handlers(this as unknown as S.Event<S.Event.Target, D>) as S.Event.Handler<S.Event.Target, D>[];
    }
}

/**
 * Makes an object for handy use in either making new, or handling events.
 * @param Options The `ID` and `Name` for this event.
 * @returns `New` event (constructor wrapper) and `Handler` — Event handler factory.  
 */

function EventFactory <D extends {}, T extends S.Event.Target>({ID, Name} : {ID: string, Name : string}) { return ({
    /**
     * Creates a new instance of the event.
     * @param  Options 
     */
    New : ({Target, Data} : {Target : T, Data : D}) => new Event({ID, Name, Target, Data}),
    /**
     * Creates a new Event Handler for this event.
     * 
     * @param Callback The callback function that will be triggered.
     * 
     * @param OtherProperties Any other properties a handler could have (e.g. `Priority`)
    */
    Handler: (
            Callback : (this : T, event : S.Event<T, D>) => void,
            OtherProperties?: Omit<S.Event.Handler<T, D>, "_">) =>
                Object.assign(Callback, {...OtherProperties, _: `SRD.EVENT.${ID}.HANDLER`}), 
})}

/// Example Factory usage below.
const EntityDamageEvent = EventFactory<{Damage : {Type : string, Amount : number}}, S.Event.Target>({ID: `ENTITY.DAMAGE`, Name: `EntityDamageEvent`});

/// Example Fire resistance implementation.
const ResistanceFire = EntityDamageEvent.Handler(e => {
    if(e.Data.Damage.Type === "SRD.DAMAGE.FIRE") {
        e.Data.Damage.Amount = Math.floor(e.Data.Damage.Amount / 2);
    }
});

const Logger = EntityDamageEvent.Handler(e => {
    console.log(`Taking ${e.Data.Damage.Amount} ${e.Data.Damage.Type} damage — Ouch(!)`)
})

/// Example Event.Target implementation 
const EventTarget : S.Event.Target = {
    Data : {
        Handlers : [
            ResistanceFire,
            Logger
        ]
    },
    Handlers<D extends {}, E extends S.Event<S.Event.Target, D>>(event: E) {
        // Return a list of applicable handlers for a certain event.
        return this.Data.Handlers.filter(
            (h : S.Event.Handler<S.Event.Target, D>) =>
                    h._.split(".")
                       .slice(0, -1)
                       .join(".") === event._
        ) as S.Event.Handler<S.Event.Target, D>[];
    } 
}

/// Make (and fire) example event.

const DamageEvent = EntityDamageEvent.New({Target: EventTarget, Data: { Damage: { Type : "SRD.DAMAGE.FIRE", Amount : 17 } }});
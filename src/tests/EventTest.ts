import { DND_5E as D } from "../5E";
import { System as S } from "../System";

const Logger = D.Event.Entity.Damage.Event.Handler(e => {
    console.log(`Taking ${e.Data.Damage.Amount} ${e.Data.Damage.Type.Name} damage — Ouch(!)`)
}, {Priority: Infinity})

/// Example Event.Target implementation 
const EventTarget : S.Event.Target = {
    Data : {
        Handlers : [
            D.Event.Entity.Damage.Immunity(D.Damage.NON_MAGICAL),
            D.Event.Entity.Damage.Resistance(D.Damage.BLUDGEONING),
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

D.Event.Entity.Damage.Event.New({Target: EventTarget, Data: { Damage: D.Damage.BLUDGEONING(12, D.Damage.Source.MAGICAL())}});
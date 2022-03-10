export namespace System {
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
         * An event handler is actually a function, with extra properties that describe itse;f.
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
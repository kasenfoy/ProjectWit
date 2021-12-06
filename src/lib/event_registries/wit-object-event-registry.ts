import {WitObject} from "../types";

class WitObjectEventRegistry
{
    private static instance?: WitObjectEventRegistry;
    private registeredFunctions: Function[] = new Array<Function>();

    protected constructor() {
    }

    public static Instance()
    {
        if (WitObjectEventRegistry.instance === undefined) {
            WitObjectEventRegistry.instance = new WitObjectEventRegistry();
            return WitObjectEventRegistry.instance;
        }
        else {
            return WitObjectEventRegistry.instance
        }
    }

    public RegisterFunction(func: Function)
    {
        this.registeredFunctions.push(func);
    }

    // This could end up being a race condition.
    public DeRegisterFunction(func: Function)
    {
        let index = this.registeredFunctions.indexOf(func);
        if (index > -1) {
            this.registeredFunctions.splice(index, 1);
        }
        else {
            console.error("Function is not registered")
        }
    }

    public onDataChange()
    {
        for (let func of this.registeredFunctions)
        {
            func();
        }
    }

}

export {WitObjectEventRegistry}
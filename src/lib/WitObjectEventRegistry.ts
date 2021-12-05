
class WitObjectEventRegistry
{
    private instance?: WitObjectEventRegistry;
    private registeredTasks: Function[] = new Array<Function>();

    private constructor() {
    }

    public Instance()
    {
        if (this.instance === undefined) {
            this.instance = new WitObjectEventRegistry();
            return this.instance;
        }
        else {
            return this.instance
        }
    }

}

export {WitObjectEventRegistry}
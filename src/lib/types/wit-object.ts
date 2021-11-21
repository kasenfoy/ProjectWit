import { v4 as uuidv4 } from 'uuid';
import * as Interfaces from "../interfaces"

abstract class WitObject {

    data: Interfaces.ITypes.IWitObject;

    constructor(params: Interfaces.ITypes.IWitObject ) {


        if (params === undefined)
            params = {id: uuidv4()}

        // Set the data
        this.data = params;

        // Set defaults

        // Set the id default (this is repeated in case id is blank or undefined)
        if (this.data.id === undefined || this.data.id === '')
            this.data.id = uuidv4();

        // Auto dates default
        this.data.created_utc = this.data.created_utc || new Date().toISOString();
        this.data.last_updated_utc = this.data.last_updated_utc || new Date().toISOString();

        // Name default
        this.data.name = this.data.name || ''
    }

    /*** Abstract implementations ***/
    abstract get(): Promise<WitObject>;
    abstract update(): Promise<WitObject>;
    abstract delete(): Promise<void>;

    /*** Static implementations ***/
    static async get(id: string): Promise<WitObject>
    {
        throw "Base class get() has been called. Child class needs an implementation of static get()"
    }

    static async create(params: Interfaces.ITypes.IWitObject): Promise<WitObject>
    {
        throw "Base class create() has been called. Child class needs an implementation of static create()"
    }

    static async scan(): Promise<WitObject[]>
    {
        throw "Base class create() has been called. Child class needs an implementation of static create()"
    }


    static generateId(): string
    {
        return uuidv4();
    }

    retrieveFromDataStore()
    {

    }
}

export { WitObject };
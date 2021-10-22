import { v4 as uuidv4 } from 'uuid';
import { DynamoInteractor } from "../dynamo-interactor";
import * as mappers from "../data_mappers/index"
import * as Interfaces from "../interfaces"



// export interface iExistingWithObject extends IWitObject{
//     id: string
// }


abstract class WitObject {
    data: Interfaces.ITypes.IWitObject;
    // name: string;
    // id: string;
    static tableName: string;

    constructor(params: Interfaces.ITypes.IWitObject ) {
        if (params === undefined)
            params = {id: uuidv4()}


        // Set the data
        this.data = params;

        // Set the id
        if (this.data.id === undefined || this.data.id === '')
            this.data.id = uuidv4();

        // Set the Created/Updated
        if(this.data.created_utc === undefined)
        {
            this.data.created_utc = new Date();
            this.data.last_updated_utc = new Date();
        }




        // Bindings
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
    }

    greet(): void
    {
        console.log("Hello from WitObject!");
        // console.log(mappers.TagMapper.create())
    }

    abstract delete(): Promise<undefined>;
    abstract get(): Promise<WitObject>;
    static generateId(): string
    {
        return uuidv4();
    }

    retrieveFromDataStore()
    {

    }
}

export { WitObject };
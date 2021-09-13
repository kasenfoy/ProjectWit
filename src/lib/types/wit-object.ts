import { v4 as uuidv4 } from 'uuid';
import { DynamoInteractor } from "../dynamo-interactor";
import * as mappers from "../data_mappers/index"

export interface IWitObject {
    id?: string,
    name?: string,
}

abstract class WitObject {
    data: IWitObject;
    // name: string;
    // id: string;
    abstract tableName: string;

    constructor(params: IWitObject) {
        if (params === undefined)
            params = {}

        // Set the id
        if (params.id === undefined || params.id === '')
            params.id = uuidv4();

        // Set the data
        this.data = params;
    }

    greet(): void
    {
        console.log("Hello from WitObject!");
        // console.log(mappers.TagMapper.create())
    }

    // get(obj: WitObject)
    // {
    //     // console.log(obj.tableName);
    //     console.log(obj.tableName)
    // }

    retrieveFromDataStore()
    {

    }
}

export { WitObject };
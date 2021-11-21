import { WitObject } from "../types/wit-object";
import { DynamoInteractor } from "../dynamo-interactor";
import {Tasks} from "../types";
import * as Interfaces from "../interfaces";
import {ITasks, IWitObject} from "../interfaces/types";

/**
 * Abstract class to implement the Data Mapper design pattern
 */


abstract class DataMapper<T extends WitObject, D extends IWitObject>
{

    // abstract witObj: WitObject;
    // abstract iWitObj: IWitObject;
    abstract tableName: string;


    // Each individual class must implement this.
    abstract toType(obj: IWitObject): T;

    // Function routes from a WitObject to get WitObject by id.
    async get(witObject: T): Promise<T>{
        // Ensure that an ID is set.
        if (witObject.data.id === undefined){
            throw "Id not set on Task"
        }

        // Retrieve and return the data.
        return await this.getById(witObject.data.id);
    }

    // Retrieve an item by its id.
    async getById(id: string): Promise<T> {
        console.debug("Called getById");

        // Retrieve the client
        let client = await DynamoInteractor.getInstance();

        // Call a get on Dynamo with the key and table
        let data = await client.get({
            TableName: this.tableName,
            Key: {'id': id}
        })

        console.debug("Data from get() call", data)
        // Cast the data as the interface
        // Then call the abstract toType in child class
        // to return the correct object type
        return this.toType(<D>data);
    }

    async create(witObject: T): Promise<T> {
        console.debug("create() has been called with WitObject: ", witObject)
        var params = {
            Item: DataMapper.toDynamoDocumentClientFormat<D>(witObject),
            ReturnConsumedCapacity: "TOTAL",
            ReturnValues: "ALL_OLD",
            Expected: {
                id: { Exists: false }
            },
            TableName: this.tableName
        }
        let client = await DynamoInteractor.getInstance();

        // This will be undefined, we just want to wait until it is done
        let data = await client.insert(params);
        await data

        // Unfortunately with Dynamo we have to call a 'get()' on the ID right after inserting
        return await this.get(witObject)
        // return new Tasks(this.fromDynamoFormat<ITasks>(await this.get(task)));
    }

    async update(witObject: T): Promise<T>{
        console.debug("update() has been called with witObject: ", witObject)

        // Update the last_updated_utc value
        witObject.data.last_updated_utc = new Date().toISOString();

        var params = {
            Item: DataMapper.toDynamoDocumentClientFormat<D>(witObject),
            ReturnConsumedCapacity: "TOTAL",
            ReturnValues: "ALL_OLD",
            // TODO There should be an 'exists' param here
            TableName: this.tableName
        }

        // Retrieve the Dynamo Client
        let client = await DynamoInteractor.getInstance();

        // This will be undefined, we just want to wait until it is done
        let data = await client.insert(params);
        await data

        // Unfortunately with Dynamo we have to call a 'get()' on the ID right after inserting
        return await this.get(witObject)
    }

    async delete(witObject: T): Promise<undefined>
    {
        return await this.deleteById(witObject.data.id);
    }


    async deleteById(id: string): Promise<undefined>
    {
        console.debug("deleteById() called with id: ", id);

        let client = await DynamoInteractor.getInstance();
        await client.delete({
            TableName: this.tableName,
            Key: {'id': id}
        })

        return;
    }

    async scan(): Promise<T[]> {
        console.debug("scan() has been called from data-mapper")
        let client = await DynamoInteractor.getInstance();

        let data = await client.scan({"TableName": this.tableName})

        let arr: T[] = [];
        for(let i = 0; i<data.Items.length; i++)
        {
            try {
                // Not entirely sure why it won't let me convert to IWitObject without @ts-ignore, implemented so I can proceed.
                // @ts-ignore
                let x = <D>(data.Items[i])
                arr.push(this.toType(x));
            } catch (err){
                throw err;
            }
        }

        console.debug("Here is the scan array: ", arr)

        // let transformedData = data.Items.map((item: T) => { return this.toType(<D>item) })
        return arr
    }

    // Workaround for WitObject transpose to sub type

    fromDynamoFormat(obj: object): D {
        return <D>obj
    }


    static fromDynamoFormat<T extends IWitObject>(obj: object): T {
        return <T> obj;
    }

    static toDynamoDocumentClientFormat<T extends IWitObject>(obj: WitObject): T {
        return <T> obj.data;
    }
}



export { DataMapper }
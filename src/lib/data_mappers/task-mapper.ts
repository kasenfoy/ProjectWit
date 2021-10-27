import { DataMapper } from "./data-mapper";
import {Tasks, WitObject} from "../types";
import {DynamoInteractor} from "../dynamo-interactor";
import {IScanOutput} from "../interfaces/dynamodb/IScanOutput";
import * as Interfaces from "../interfaces"
import {ITasks} from "../interfaces/types";

class TaskMapper extends DataMapper
{

    constructor() {
        super()
    }


    // static create(task: Tasks): Tasks {
    static async create(task: Tasks): Promise<Tasks> {
        console.debug("create() has been called with task: ", task)
        var params = {
            Item: this.toDynamoDocumentClientFormat<ITasks>(task),
            ReturnConsumedCapacity: "TOTAL",
            ReturnValues: "ALL_OLD",
            Expected: {
                id: { Exists: false }
            },
            TableName: Tasks.tableName
        }
        let client = await DynamoInteractor.getInstance();

        // This will be undefined, we just want to wait until it is done
        let data = await client.insert(params);
        await data

        // Unfortunately with Dynamo we have to call a 'get()' on the ID right after inserting
        return new Tasks(this.fromDynamoFormat<ITasks>(await this.get(task)));
    }

    // Function routes from a Task to get task by id.
    static async get(task: Tasks): Promise<Tasks>{
        // Ensure that an ID is set.
        if (task.data.id === undefined){
            throw "Id not set on Task"
        }

        // Retrieve and return the data.
        return await this.getById(task.data.id);
    }


    static async update(task: Tasks): Promise<Tasks>{
        console.debug("update() has been called with task: ", task)
        var params = {
            Item: this.toDynamoDocumentClientFormat<ITasks>(task),
            ReturnConsumedCapacity: "TOTAL",
            ReturnValues: "ALL_OLD",
            // TODO There should be an 'exists' param here
            TableName: Tasks.tableName
        }

        // Retrieve the Dynamo Client
        let client = await DynamoInteractor.getInstance();

        // This will be undefined, we just want to wait until it is done
        let data = await client.insert(params);
        await data

        // Unfortunately with Dynamo we have to call a 'get()' on the ID right after inserting
        return new Tasks(this.fromDynamoFormat<ITasks>(await this.get(task)));
    }

    // Retrieve an item by its id.
    static async getById(id: string): Promise<Tasks> {
        console.debug("Called getById");

        // Retrieve the client
        let client = await DynamoInteractor.getInstance();

        // Call a get on Dynamo with the key and table
        let data = await client.get({
            TableName: Tasks.tableName,
            Key: {'id': id}
        })

        console.debug("Data from get() call", data)
        return new Tasks(this.fromDynamoFormat<ITasks>(data));
    }


    static async delete(task: Tasks): Promise<undefined>
    {
        return await this.deleteById(task.data.id);
    }


    static async deleteById(id: string): Promise<undefined>
    {
        console.debug("deleteById() called with id: ", id);

        let client = await DynamoInteractor.getInstance();
        await client.delete({
            TableName: Tasks.tableName,
            Key: {'id': id}
        })

        return;
    }


    // TODO Implement search
    static async scan(): Promise<Tasks[]> {
        console.debug("scan() has been called from task-mapper")
        let client = await DynamoInteractor.getInstance();

        let data = await client.scan({"TableName": Tasks.tableName})
        let transformedData = data.Items.map((item: WitObject ) => { return new Tasks(this.fromDynamoFormat<ITasks>(item)) })
        return await transformedData
    }

}

export {TaskMapper}
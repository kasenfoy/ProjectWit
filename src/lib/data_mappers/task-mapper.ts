import { DataMapper } from "./data-mapper";
import {Tasks, WitObject} from "../types";
import {ITasks} from "../types";
import {DynamoInteractor} from "../dynamo-interactor";
import {iScanOutput} from "../interfaces/dynamodb/iScanOutput";

class TaskMapper extends DataMapper
{

    // static create(task: Tasks): Tasks {
    static async create(task: Tasks): Promise<Tasks> {
        console.debug("create() has been called with task: ", task)
        var params = {
            Item: TaskMapper.toDynamoDocumentClientFormat(task),
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
        return TaskMapper.fromDynamoFormat(await Tasks.get(task.data.id));


        // DynamoInteractor.getInstance().then((i: DynamoInteractor) => {
        //     i.insert(params)
        // })
        // DynamoInteractor.getInstance().insert(params);
        // return DynamoInteractor.getInstance()
        //     .then((di: DynamoInteractor ) => {
        //         di.insert(params);
        //     })
        //     .then(()=>{
        //         return Promise.resolve(task);
        //     });
        // let instance = await DynamoInteractor.getInstance()
        // instance.insert(params);
        // return task;
        // return task;
        // insert(params);
        // return task;
    }

    // Function routes from a Task to get task by id.
    static async get(task: Tasks): Promise<Tasks>{
        if (task.data.id === undefined){
            throw "Id not set on Task"
        }
        return await TaskMapper.getById(task.data.id);
    }

    // Retrieve an item by it's id.
    static async getById(id: string): Promise<Tasks> {
        console.debug("Called getById");

        let client = await DynamoInteractor.getInstance();
        let data = await client.get({
            TableName: Tasks.tableName,
            Key: {'id': id}
        })
        console.debug("Data", data)
        return TaskMapper.fromDynamoFormat(data);
    }

    static async delete(task: Tasks): Promise<undefined>
    {
        return await TaskMapper.deleteById(task.data.id);
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


    static async scan(): Promise<Tasks[]> {
        console.debug("scan() has been called from task-mapper")
        let client = await DynamoInteractor.getInstance();

        let data = await client.scan({"TableName": Tasks.tableName})
        let transformedData = data.Items.map((item: WitObject ) => { return TaskMapper.fromDynamoFormat(item) })
        return await transformedData
    }


    // create(tag: Tag): void {
    //
    //     console.log('Creating tag')
    // }
    // update(): {} {
    //     console.log('Updating tag')
    //     return {};
    // }

    // static get(task: Tasks): ITasks {
    //     console.log(task)
    //     console.log(task.data)
    //     const data = DynamoInteractor
    //         .getInstance()
    //         .get(task.data.id, task.tableName);
    //     console.log('Getting task')
    //     console.log(data)
    //     return data;
    // }


    // static fromDynamoFormat(obj: any): ITasks {
    //     const iTask = <ITasks>obj;
    //     return iTask;
    // }

    static fromDynamoFormat(obj: object): Tasks {
        const iTask = <ITasks>obj;
        return new Tasks(iTask);
    }

    // TODO Determine if this is needed after swap to DocumentClient
    static toDynamoFormat(task: Tasks): Object {

        let data = {
            "id": {
                S: task.data.id
            },
            "name": {
                S: task.data.name
            },
            "description": {
                S: task.data.description
            }
        }

        return data;
    }

    static toDynamoDocumentClientFormat(task: Tasks): Object {
        let data = {
            "id": task.data.id,
            "name": task.data.name,
            "description": task.data.description
        }

        return data;
    }
}

export {TaskMapper}
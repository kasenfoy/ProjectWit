import { DataMapper } from "./data-mapper";
import {Tasks} from "../types";
import {ITasks} from "../types";
import {DynamoInteractor} from "../dynamo-interactor";

class TaskMapper extends DataMapper
{

    static create(task: Tasks): Tasks {
        var params = {
            Item: TaskMapper.toDynamoFormat(task),
            ReturnConsumedCapacity: "TOTAL",
            ReturnValues: "NONE",
            Expected: {
                id: { Exists: false }
            },
            TableName: task.tableName
        }

        DynamoInteractor.getInstance().insert(params);
        return task;
    }

    // create(tag: Tag): void {
    //
    //     console.log('Creating tag')
    // }
    // update(): {} {
    //     console.log('Updating tag')
    //     return {};
    // }

    static get(task: Tasks): ITasks {
        console.log(task)
        console.log(task.data)
        const data = DynamoInteractor
            .getInstance()
            .get(task.data.id, task.tableName);
        console.log('Getting task')
        console.log(data)
        return data;
    }

    static fromDynamoFormat(obj: any): ITasks {
        const iTask = <ITasks>obj;
        return iTask;
    }



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
}

export {TaskMapper}
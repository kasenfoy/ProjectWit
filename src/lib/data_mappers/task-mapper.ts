import { DataMapper } from "./data-mapper";
import {Tag, Tasks, WitObject} from "../types";
import {DynamoInteractor} from "../dynamo-interactor";
import {IScanOutput} from "../interfaces/dynamodb/IScanOutput";
import * as Interfaces from "../interfaces"
import {ITasks} from "../interfaces/types";
import * as constants from "../constants";
import {DynamoDB} from "aws-sdk";

class TaskMapper extends DataMapper<Tasks, ITasks>
{
    tableName: string = constants.config.dynamoTables.tasks;
    static tableName: string = constants.config.dynamoTables.tasks;

    constructor() {
        super()
    }

    // Can be abstracted to updateTag
    // Add methods addTag and removeTag
    // That map to updateTag with the Action value ADD | DELETE

    // As well, to prevent race condition issues with adding a non-unique tag
    // First search the local item.
    // If found, exit
    // If not, get count of items.
    // add conditional expression, count of items == local count of items.
    async addTag(task: Tasks, tag: Tag)
    {
        console.debug("addTag() has been called in task-mapper with tag: ", tag);

        // Expects key name to be tags
        // Left off here ValidationException One or more parameter values were invalid ADD action is not supported for the type S
        var params =
            {
                TableName: this.tableName,
                Key: {'id': task.data.id},
                // UpdateExpression: 'set #t = :tags',
                AttributeUpdates: {
                    'tags': {
                        Action: 'ADD',
                        Value: [tag.data.id]
                    }
                },
                Expected: {
                    'tags': {
                        ComparisonOperator: 'NOT_CONTAINS',
                        Value: tag.data.id
                    }
                }
            }

        let client = await DynamoInteractor.getInstance();

        // This will be undefined, we just want to wait until it is done
        try {
            let data = await client.update(params);
            await data

            // Unfortunately with Dynamo we have to call a 'get()' on the ID right after inserting
            return await this.get(task)
        }
        catch (e) {
            try {
                // @ts-ignore Expect e to be of dynamo
                if (e.code === 'ConditionalCheckFailedException')
                {
                    // TODO spawn error message dropdown
                    throw 'Tag already exists on task.'
                }
            }
            catch (e) {
                throw e
            }
            throw e
        }

    }

    toType(obj: ITasks): Tasks {
        return new Tasks(obj);
    }
}

export {TaskMapper}
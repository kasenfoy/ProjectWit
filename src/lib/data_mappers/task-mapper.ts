import { DataMapper } from "./data-mapper";
import {Tasks, WitObject} from "../types";
import {DynamoInteractor} from "../dynamo-interactor";
import {IScanOutput} from "../interfaces/dynamodb/IScanOutput";
import * as Interfaces from "../interfaces"
import {ITasks} from "../interfaces/types";
import * as constants from "../constants";

class TaskMapper extends DataMapper<Tasks, ITasks>
{
    tableName: string = constants.config.dynamoTables.tasks;
    static tableName: string = constants.config.dynamoTables.tasks;

    constructor() {
        super()
    }

    toType(obj: ITasks): Tasks {
        return new Tasks(obj);
    }
}

export {TaskMapper}
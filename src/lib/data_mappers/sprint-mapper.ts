import { DataMapper } from "./data-mapper";
import {Tasks, WitObject} from "../types";
import {DynamoInteractor} from "../dynamo-interactor";
import * as constants from "../constants";
import {ITasks} from "../interfaces/types";
import {Sprints, ISprints} from "../types/sprints";


class SprintMapper extends DataMapper<Sprints, ISprints>
{
    tableName: string = constants.config.dynamoTables.sprints;



    toType(obj: ISprints): Sprints {
        return new Sprints(obj);
    }
}

export {SprintMapper}
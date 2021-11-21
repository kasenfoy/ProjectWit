import { DataMapper } from "./data-mapper";
import {Tag} from "../types";
import {ITags} from "../interfaces/types";
import * as constants from "../constants";


class TagMapper extends DataMapper<Tag, ITags>
{

    tableName: string = constants.config.dynamoTables.tags;
    static tableName: string = constants.config.dynamoTables.tags;

    constructor() {
        super()
    }

    toType(obj: ITags): Tag {
        return new Tag(obj);
    }

}

export {TagMapper}
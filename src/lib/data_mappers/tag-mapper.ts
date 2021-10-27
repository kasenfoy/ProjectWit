import { DataMapper } from "./data-mapper";
import {Tag} from "../types";
import {ITags} from "../interfaces/types";

class TagMapper extends DataMapper<Tag, ITags>
{

    tableName: string = 'tags';
    static tableName: string = 'tags'

    constructor() {
        super()
    }

    toType(obj: ITags): Tag {
        return new Tag(obj);
    }

}

export {TagMapper}
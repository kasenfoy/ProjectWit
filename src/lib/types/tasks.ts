import {WitObject} from "./wit-object";
import {TaskMapper} from "../data_mappers";
import * as Interfaces from "../interfaces/";
import {Tag} from "./tag";
import {DataMapperListActions} from "../data_mappers/data-mapper";
import {Status} from "./sprints";


class Tasks extends WitObject {

    data: Interfaces.ITypes.ITasks;
    mapper: TaskMapper;
    static mapper: TaskMapper = new TaskMapper();

    constructor(params: Interfaces.ITypes.ITasks) {
        super(params);
        this.data = params;

        // Defaults
        // if (params.sprints === undefined)
        //     params.sprints = []
        //
        // if (params.tags === undefined)
        //     params.tags = []

        params.description = params.description || ""
        params.created_by = params.created_by || ""
        params.due = params.due || ""
        params.tags = params.tags || []
        params.sprint = params.sprint || ""
        params.status = params.status || Status.NOT_STARTED

        this.mapper = new TaskMapper();
    }

    async get(): Promise<Tasks>
    {
        return await this.mapper.get(this);
    }

    async update(): Promise<Tasks>
    {
        return await this.mapper.update(this);
    }

    async delete(): Promise<void>
    {
        return await this.mapper.delete(this);
    }

    async addTag(tag: Tag): Promise<Tasks>
    {
        return await this.mapper.updateTags(this, tag, DataMapperListActions.ADD)
    }

    async removeTag(tag: Tag): Promise<Tasks>
    {
        return await this.mapper.updateTags(this, tag, DataMapperListActions.DELETE)
    }

    static async create(params: Interfaces.ITypes.ITasks): Promise<Tasks>
    {
        let task = new Tasks(params)
        return await Tasks.mapper.create(task);
    }

    static async get(id: string): Promise<Tasks>
    {
        return new Tasks((await Tasks.mapper.getById(id)).data);
    }

    static async delete(id: string): Promise<undefined>
    {
        return await Tasks.mapper.deleteById(id);
    }

    static async scan(): Promise<Tasks[]>
    {
        console.log("123Is the mapper undefinded?", Tasks.mapper)
        console.log("123How about this?", this)
        return await Tasks.mapper.scan();
    }
}

export { Tasks }
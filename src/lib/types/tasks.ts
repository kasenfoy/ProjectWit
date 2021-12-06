import {WitObject} from "./wit-object";
import {TaskMapper} from "../data_mappers";
import * as Interfaces from "../interfaces/";
import {Tag} from "./tag";
import {DataMapperListActions} from "../data_mappers/data-mapper";
import {Status} from "./sprints";
import {TaskEventRegistry} from "../event_registries/task-event-registry";


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
        let data = await this.mapper.update(this);
        Tasks.dataChanged();
        return data;
    }

    async delete(): Promise<void>
    {
        let data = await this.mapper.delete(this);
        Tasks.dataChanged();
        return data
    }

    async addTag(tag: Tag): Promise<Tasks>
    {
        let data = await this.mapper.updateTags(this, tag, DataMapperListActions.ADD)
        Tasks.dataChanged();
        return data
    }

    async removeTag(tag: Tag): Promise<Tasks>
    {
        let data = await this.mapper.updateTags(this, tag, DataMapperListActions.DELETE)
        Tasks.dataChanged();
        return data
    }

    static async create(params: Interfaces.ITypes.ITasks): Promise<Tasks>
    {
        let task = new Tasks(params)
        let data = await Tasks.mapper.create(task);
        Tasks.dataChanged();
        return data
    }

    static async get(id: string): Promise<Tasks>
    {
        return new Tasks((await Tasks.mapper.getById(id)).data);
    }

    static async delete(id: string): Promise<undefined>
    {
        let data = await Tasks.mapper.deleteById(id);
        Tasks.dataChanged();
        return data
    }

    static async scan(): Promise<Tasks[]>
    {
        return await Tasks.mapper.scan();
    }

    static dataChanged(): void
    {
        TaskEventRegistry.Instance().onDataChange()
    }
}

export { Tasks }
import {WitObject} from "./wit-object";
import {TaskMapper} from "../data_mappers";
import * as Interfaces from "../interfaces/";


class Tasks extends WitObject {

    data: Interfaces.ITypes.ITasks;
    mapper: TaskMapper;
    static mapper: TaskMapper = new TaskMapper();

    constructor(params: Interfaces.ITypes.ITasks) {
        super(params);
        this.data = params;
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

    static async create(params: Interfaces.ITypes.ITasks): Promise<Tasks>
    {
        let task = new Tasks(params)
        return await this.mapper.create(task);
    }

    static async get(id: string): Promise<Tasks>
    {
        return new Tasks((await this.mapper.getById(id)).data);
    }

    static async delete(id: string): Promise<undefined>
    {
        return await this.mapper.deleteById(id);
    }

    static async scan(): Promise<Tasks[]>
    {
        return await this.mapper.scan();
    }
}

export { Tasks }
// import { WitObject } from "./wit-object";
import * as Mappers from "../data_mappers/"
import * as Types from "../types"
import * as Interfaces from "../interfaces";
import {TagMapper} from "../data_mappers/";

class Tag extends Types.WitObject {

    data: Interfaces.ITypes.ITags;
    mapper: TagMapper;
    static mapper: TagMapper = new TagMapper();

    constructor(params: Interfaces.ITypes.ITasks) {
        super(params);
        this.data = params;
        this.mapper = new TagMapper();
    }
    async get(): Promise<Tag>
    {
        return await this.mapper.get(this);
    }

    async update(): Promise<Tag>
    {
        return await this.mapper.update(this);
    }

    async delete(): Promise<void>
    {
        return await this.mapper.delete(this);
    }

    static async create(params: Interfaces.ITypes.ITasks): Promise<Tag>
    {
        let task = new Tag(params)
        return await this.mapper.create(task);
    }

    static async get(id: string): Promise<Tag>
    {
        return new Tag((await this.mapper.getById(id)).data);
    }

    static async delete(id: string): Promise<undefined>
    {
        return await this.mapper.deleteById(id);
    }

    static async scan(): Promise<Tag[]>
    {
        return await this.mapper.scan();
    }
}

export { Tag }
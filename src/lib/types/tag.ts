// import { WitObject } from "./wit-object";
import * as Mappers from "../data_mappers/"
import * as Types from "../types"
import * as Interfaces from "../interfaces";
import {TagMapper} from "../data_mappers/";
import {Tasks} from "../types";

class Tag extends Types.WitObject {

    data: Interfaces.ITypes.ITags;
    mapper: TagMapper;
    static mapper: TagMapper = new TagMapper();

    constructor(params: Interfaces.ITypes.ITags) {
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
        // Async call to remove the tag from all tasks
        Tag.removeTagsFromTasks(this);

        // Now delete the tag
        return await this.mapper.delete(this);
    }

    static async create(params: Interfaces.ITypes.ITags): Promise<Tag>
    {
        let task = new Tag(params)
        return await Tag.mapper.create(task);
    }

    static async get(id: string): Promise<Tag>
    {
        return new Tag((await Tag.mapper.getById(id)).data);
    }

    static async delete(id: string): Promise<undefined>
    {
        Tag.removeTagsFromTasks(new Tag({id: id}))
        return await Tag.mapper.deleteById(id);
    }

    static async scan(): Promise<Tag[]>
    {
        return await Tag.mapper.scan();
    }

    static async removeTagsFromTasks(tag: Tag)
    {
        // Remove from all Tasks
        let tasks = await Tasks.scan();
        tasks.map((task: Tasks)=>{

            // Check through each task to see if it contains the tag
            if (task.data.tags?.includes(tag.data.id))
            {
                // Remove the tag, no need to wait?
                task.removeTag(tag);
            }
        })
    }

}

export { Tag }
import {WitObject, IWitObject} from "./wit-object";
import {TaskMapper} from "../data_mappers";
import {iScanOutput} from "../interfaces/dynamodb/iScanOutput";

export interface ITasks extends IWitObject {
    description?: string;
}

// export interface ITasksNew extends ITasks {
//     id?: string;
// }

class Tasks extends WitObject {

    static tableName: string = "tasks";
    data: ITasks;

    constructor(params: ITasks) {
        super(params);
        this.data = params;
    }

    // TODO Refactor, this should be static
    static async create(params: ITasks): Promise<Tasks>
    {
        // Call the constructor, this maps from static to constructor
        // it enables us de-serializing the Task from the data source by directly calling the constructor.
        // Also ensure that id always exists on IWitObject
        params.id = WitObject.generateId();
        let task = new Tasks(params);

        let data = await TaskMapper.create(task);
        return data;
        // return TaskMapper.toDynamoDocumentClientFormat(data)
    }

    async get(): Promise<Tasks>
    {
        console.log("Calling non-static get from Tasks");
        return await TaskMapper.get(this)
    }

    async delete(): Promise<undefined>
    {
        console.debug("delete() on task: ", this);
        return await TaskMapper.delete(this);
    }

    static async get(id: string): Promise<Tasks>
    {
        console.log("Calling static get from Tasks");
        return await TaskMapper.getById(id);
    }

    static async delete(id: string): Promise<undefined>
    {
        console.debug("static delete() on task with id: ", id);
        return await TaskMapper.deleteById(id);
    }

    static async scan(): Promise<Tasks[]>
    {
        console.log("scan() has been called in tasks.ts");
        return await TaskMapper.scan();
    }

    // static get(id: string|undefined): Tasks {
    //     // LEFT OFF Dunno, somewhere around here
    //     const iTask = TaskMapper.get(new Tasks({id: id}));
    //     const task = new Tasks(iTask);
    //     console.log("Retrieved task with id:" + task.data);
    //     return task;
    // }

    greet(): void
    {
        console.log("Hello from Tasks!");
        console.log()
    }
}

export { Tasks }
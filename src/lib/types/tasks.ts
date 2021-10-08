import { WitObject, IWitObject } from "./wit-object";
import {TaskMapper} from "../data_mappers";

export interface ITasks extends IWitObject {
    description?: string;
}

class Tasks extends WitObject {

    tableName: string = "tasks";
    data: ITasks;

    constructor(params: ITasks) {
        super(params);
        this.data = params;
    }

    async create()
    {
        await TaskMapper.create(this);
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
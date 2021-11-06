import {WitObject} from "./index";
import {IWitObject} from "../interfaces/types";
import {SprintMapper} from "../data_mappers/sprint-mapper";
import {TaskMapper} from "../data_mappers";

interface ISprints extends IWitObject
{

}

class Sprints extends WitObject
{
    mapper: SprintMapper;
    static mapper: SprintMapper = new SprintMapper();

    constructor(props: ISprints) {
        super(props);
        this.data = props
        this.mapper = new SprintMapper();
    }

    async get(): Promise<Sprints>
    {
        throw "Not Implemented"
    }

    async update(): Promise<Sprints>
    {
        throw "Not Implemented"
    }

    async delete()
    {
        throw "Not Implemented"
    }

    static async create(params: ISprints): Promise<Sprints>
    {
        let task = new Sprints(params)
        return await Sprints.mapper.create(task);
    }

    static async scan(): Promise<Sprints[]>
    {
        return await Sprints.mapper.scan();
    }
}

export {Sprints}
export type {ISprints}
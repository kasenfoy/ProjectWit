import {WitObject} from "./index";
import {IWitObject} from "../interfaces/types";
import {SprintMapper} from "../data_mappers/sprint-mapper";
import {TaskMapper} from "../data_mappers";
import {DateHelper} from "../helpers/DateHelper";
import {TaskEventRegistry} from "../event_registries/task-event-registry";

enum Status {
    NOT_STARTED = "Not Started",
    IN_PROGRESS = "In Progress",
    REVIEW = "Review",
    COMPLETE = "Complete"
}



interface ISprints extends IWitObject
{
    start_date?: string
    end_date?: string
}

class Sprints extends WitObject
{
    data: ISprints;
    mapper: SprintMapper;
    static mapper: SprintMapper = new SprintMapper();

    constructor(props: ISprints) {
        super(props);
        this.data = props

        // Defaults
        this.data.start_date = this.data.start_date || DateHelper.toStringDate(new Date())

        this.mapper = new SprintMapper();

    }

    dataChanged(): void
    {
            TaskEventRegistry.Instance().onDataChange()
    }

    async get(): Promise<Sprints>
    {
        return this.mapper.getById(this.data.id);
    }

    async update(): Promise<Sprints>
    {
        return this.mapper.update(this);
    }

    async delete()
    {
        return this.mapper.delete(this);
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

    static async get(id: string): Promise<Sprints>
    {
        return await Sprints.mapper.getById(id);
    }

    static async delete(id: string): Promise<undefined>
    {
        return await Sprints.mapper.deleteById(id);
    }
}

export {Sprints, Status}
export type {ISprints}
import {IWitObject} from "./IWitObject";

export interface ITasks extends IWitObject {
    description?: string;
    created_by?: string;
    due?: Date;
    tags?: string[];
    sprints?: string[];
}
import {IWitObject} from "./IWitObject";
import {Status} from "../../types/sprints";

export interface ITasks extends IWitObject {
    description?: string;
    created_by?: string;
    due?: string;
    tags?: string[];
    sprint?: string;
    status?: Status
}
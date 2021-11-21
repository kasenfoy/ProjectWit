import {Status} from "../types/sprints";

class SelectSearchHelper
{
    // Select Search Helper for ENUM "Status"
    public static StatusSelectSearch =
    [
        {name: Status.NOT_STARTED, value: Status.NOT_STARTED},
        {name: Status.IN_PROGRESS, value: Status.IN_PROGRESS},
        {name: Status.REVIEW, value: Status.REVIEW},
        {name: Status.COMPLETE, value: Status.COMPLETE }
    ]
}

export {SelectSearchHelper}
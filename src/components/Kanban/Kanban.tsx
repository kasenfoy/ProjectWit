import React from "react";
import {Lane} from "./Lane";
import {Status} from "../../lib/types/sprints";
import KanbanCss from "../css/kanban.module.css";
import {Tasks} from "../../lib/types";

interface KanbanProps {
    handleTaskStatusChange?: Function
    tasks: Array<Tasks>

}
interface KanbanState {}

class Kanban extends React.Component<KanbanProps, KanbanState>
{

    constructor(props: KanbanProps) {
        super(props);


    }

    render() {
        let lanes = [];
        let statuses = [Status.NOT_STARTED, Status.IN_PROGRESS, Status.REVIEW, Status.COMPLETE]
        for (let s of statuses)
        {
            lanes.push(<Lane tasks={this.props.tasks} status={s}/>);
        }

        let html = <div className={KanbanCss.Kanban}>{lanes}</div>

        return html;
    }
}

export {Kanban}
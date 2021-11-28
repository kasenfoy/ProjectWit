import React from "react";
import {Lane} from "./Lane";
import {Status} from "../../lib/types/sprints";
import KanbanCss from "../css/kanban.module.css";

interface KanbanProps {
    handleTaskStatusChange?: Function
}
interface KanbanState {}

class Kanban extends React.Component<KanbanProps, KanbanState>
{

    constructor(props: KanbanProps) {
        super(props);


    }


    render() {
        let lanes = [];
        lanes.push(<Lane status={Status.NOT_STARTED}/>)
        lanes.push(<Lane status={Status.IN_PROGRESS}/>)
        lanes.push(<Lane status={Status.REVIEW}/>)
        lanes.push(<Lane status={Status.COMPLETE}/>)

        let html = <div className={KanbanCss.Kanban}>{lanes}</div>

        return html;
    }
}

export {Kanban}
import React from "react";
import {Status} from "../../lib/types/sprints";
import KanbanCss from "../css/kanban.module.css";
import {WitObject} from "../../lib/types";

interface KanbanBlockProps {
    handleTaskStatusChange?: Function,
    witObject: WitObject;
    status?: Status,
}
interface KanbanBlockState {}

class KanbanBlock extends React.Component<KanbanBlockProps, KanbanBlockState>
{
    constructor(props: KanbanBlockProps) {
        super(props);


        this.onDragStart = this.onDragStart.bind(this);
    }

    onDragStart(e: React.DragEvent)
    {
        e.dataTransfer.setData("id", this.props.witObject.data.id)
    }

    render() {

        let html =
            <div
            key={this.props.witObject.data.id}
            draggable={true}
            onDragStart={this.onDragStart}
            className={KanbanCss.KanbanBlock}>
                {this.props.witObject.data.name}
            </div>

        return html;
    }
}

export {KanbanBlock}
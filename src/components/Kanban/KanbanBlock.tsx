import React from "react";
import {Status} from "../../lib/types/sprints";
import KanbanCss from "../css/kanban.module.css";

interface KanbanBlockProps {
    handleTaskStatusChange?: Function,
    status: Status,
    value: string
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
        e.dataTransfer.setData("id", this.props.value)
    }

    render() {

        let html =
            <div
            draggable={true}
            onDragStart={this.onDragStart}
            className={KanbanCss.KanbanBlock}>
                {this.props.value}
            </div>

        return html;
    }
}

export {KanbanBlock}
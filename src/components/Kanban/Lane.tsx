import React, {SyntheticEvent} from "react";
import {Status} from "../../lib/types/sprints";
import KanbanCss from "../css/kanban.module.css";
import {randomInt} from "crypto";
import {KanbanBlock} from "./KanbanBlock";

interface LaneProps {
    handleTaskStatusChange?: Function,
    status: Status
}
interface LaneState {}

class Lane extends React.Component<LaneProps, LaneState>
{
    constructor(props: LaneProps) {
        super(props);

    }

    // TODO Delete this
    generateFakeBlocks()
    {
        let blocks = [];
        let amount = Math.random() * (6 - 1) + 1;;
        for (let i = 0; i < amount; i++)
        {
            blocks.push(<KanbanBlock status={this.props.status} value={i.toString()}/>)
        }

        return blocks
    }

    allowDrop(e: any)
    {
        e.preventDefault()
    }

    handleDrop(e:  React.DragEvent<HTMLDivElement> | undefined)
    {
        console.debug(typeof e)
        console.debug(e)
        // console.debug(e.target)
        // TODO LEFT OFF HERE 2021-11-21
        console.debug(e?.dataTransfer.getData("id"))
    }

    render() {
        let html =
            <div className={KanbanCss.Lane} onDrop={this.handleDrop} onDragOver={this.allowDrop}>
                {this.props.status}
                {this.generateFakeBlocks()}
            </div>

        return html;
    }
}

export {Lane}
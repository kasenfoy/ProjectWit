import React, {SyntheticEvent} from "react";
import {Status} from "../../lib/types/sprints";
import KanbanCss from "../css/kanban.module.css";
import {KanbanBlock} from "./KanbanBlock";
import {Tasks} from "../../lib/types";

interface LaneProps {
    handleTaskStatusChange?: Function,
    tasks: Tasks[]
    status: Status
}
interface LaneState {}

class Lane extends React.Component<LaneProps, LaneState>
{
    constructor(props: LaneProps) {
        super(props);

        this.generateTaskBlocks = this.generateTaskBlocks.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    generateTaskBlocks(): JSX.Element[]
    {
        let blocks: JSX.Element[] = new Array<JSX.Element>();
        for (let i = 0; i<this.props.tasks.length; i++)
        {
            if (this.props.tasks[i].data.status === undefined || this.props.tasks[i].data.name === undefined) {
            console.error("Task Status or Name is not defined for: ", this.props.tasks[i].data)
            continue;
        }

            // Task is not for this lane.
            if (this.props.tasks[i].data.status !== this.props.status) {continue;}

            blocks.push(
                <KanbanBlock
                    status={this.props.tasks[i].data.status}
                    witObject={this.props.tasks[i]}
                />)
        }

        return blocks
    }

    allowDrop(e: any)
    {
        e.preventDefault()
    }

    handleDrop(e:  React.DragEvent<HTMLDivElement> | undefined): void
    {
        console.debug(e)

        let id = e?.dataTransfer.getData("id")
        console.debug("ID of dropped object: ", id)
        console.debug("Status of current lane: ", this.props.status)

        // call update
        // TODO This may introduce a bug if some other object drops on this with an "id" dataTransfer
        if (id === undefined)
            return;

        let task = new Tasks({id: id})
        Tasks.get(id).then((task: Tasks) => {
            task.data.status = this.props.status;
            task.update();
        })
    }


    render() {
        let html =
            <div className={KanbanCss.Lane} onDrop={this.handleDrop} onDragOver={this.allowDrop}>
                {this.props.status}
                {/*{this.generateFakeBlocks()}*/}
                {this.generateTaskBlocks()}
            </div>

        return html;
    }
}

export {Lane}
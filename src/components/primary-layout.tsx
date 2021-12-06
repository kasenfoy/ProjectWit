import React from "react";
import {FormHolder} from "./forms/form-holder";
import {Tag, Tasks, Sprints, WitObject} from "../lib/types";
import {TileList} from "./tile-list";
import exp from "constants";
import {LeftMenu} from "./left-menu";

import PrimaryLayoutCss from "./css/primary-layout.module.css"
import SelectSearchCss from "./css/select-search.module.css"
import SelectSearch from "react-select-search";
import {Kanban} from "./Kanban/Kanban";
import {TaskEventRegistry} from "../lib/event_registries/task-event-registry";
import {SprintEventRegistry} from "../lib/event_registries/sprint-event-registry";
import {TagEventRegistry} from "../lib/event_registries/tag-event-registry";

// TODO Global hooks (Not necessary, props for data?) should be done here for data.

// TODO Evaluate if this is the right approach (Enum?)
enum WitComponent {
    TASKS = 'Tasks',
    TAGS = 'Tags',
    SPRINTS = 'Sprints',
    USERS = 'Users'
}

interface PrimaryLayoutProps {};
interface PrimaryLayoutState {
    activeComponent: WitComponent,
    selectedObject?: WitObject,
    taskData: Tasks[],
    tagData: Tag[],
    sprintData: Sprints[]
    // TODO Implement Users and Sprints
}

class PrimaryLayout extends React.Component<PrimaryLayoutProps, PrimaryLayoutState>
{
    state: PrimaryLayoutState = {
        // Default to Tasks on application start.
        // This is used to conditionally render the different windows for all child elements.
        activeComponent: WitComponent.TASKS,
        selectedObject: undefined,
        taskData: [],
        tagData: [],
        sprintData: []
    };

    constructor(props: PrimaryLayoutProps) {
        super(props);

        // Set up the tasks
        this.updateTasks()

        // Set up tags
        this.updateTags()

        // Set up sprints
        this.updateSprints()


        // Register the functions to listen for changes
        TaskEventRegistry.Instance().RegisterFunction(this.updateTasks.bind(this))
        TagEventRegistry.Instance().RegisterFunction(this.updateTags.bind(this))
        SprintEventRegistry.Instance().RegisterFunction(this.updateSprints.bind(this))

        // Bindings
        this.setActiveComponent = this.setActiveComponent.bind(this);
        this.setSelectedObject = this.setSelectedObject.bind(this);
        this.clearSelectedObject = this.clearSelectedObject.bind(this);
        this.updateTasks = this.updateTasks.bind(this);
        this.updateTags = this.updateTags.bind(this);
        this.updateSprints = this.updateSprints.bind(this);
    }


    public updateTasks()
    {
        Tasks.scan().then((tasks: Tasks[]) => {
            this.setState({taskData: tasks})
        })
    }

    private updateTags()
    {
        Tag.scan().then((tag: Tag[]) => {
            this.setState({tagData: tag})
        })
    }

    private updateSprints()
    {
        Sprints.scan().then((sprint: Sprints[]) => {
            this.setState({sprintData: sprint})
        })
    }

    // Change Active Component (used by child elements of this component)
    setActiveComponent(component: WitComponent)
    {
        // Unset the selected object too to avoid rendering tag form for task id, etc.
        this.setState({activeComponent: component, selectedObject: undefined})
    }

    setSelectedObject(witObject: WitObject)
    {
        this.setState({selectedObject: witObject})
    }

    // Used when we want to create a new object and need to clear the forms.
    clearSelectedObject()
    {
        this.setState({selectedObject: undefined})
    }


    private getDataForComponent(): WitObject[]
    {
        switch (this.state.activeComponent) {
            case WitComponent.TASKS: {return this.state.taskData}
            case WitComponent.TAGS: {return this.state.tagData}
            case WitComponent.SPRINTS: {return this.state.sprintData}
            default: {throw "WitComponent not implemented in primary layout."}
        }
    }

    // Conditionally rendering the lists.
    render() {
        let html =
            <div id={"all-content"} className={PrimaryLayoutCss.PrimaryLayout}>
                <LeftMenu handleActiveComponentChange={this.setActiveComponent}/>

                <TileList
                    data={this.getDataForComponent()}
                    setSelectedObject={this.setSelectedObject}
                    clearSelectedObject={this.clearSelectedObject}
                    activeComponent={this.state.activeComponent}
                />
                <div className={PrimaryLayoutCss.RightColumnLayout}>
                    <FormHolder
                        activeComponent={this.state.activeComponent}
                        selectedObject={this.state.selectedObject}
                        tagData={this.state.tagData}
                        sprintData={this.state.sprintData}
                    />

                    <Kanban
                        tasks={this.state.taskData}
                    />
                </div>
                <div id={"testing"}></div>

            </div>

        return html;
    }
}

export {PrimaryLayout}
export {WitComponent}
import React from "react";
import {FormHolder} from "./forms/form-holder";
import {Tag, Tasks, Sprints, WitObject} from "../lib/types";
import {TileList} from "./tile-list";
import exp from "constants";
import {LeftMenu} from "./left-menu";

import PrimaryLayoutCss from "./css/primary-layout.module.css"
import SelectSearchCss from "./css/select-search.module.css"
import SelectSearch from "react-select-search";

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
        Tasks.scan().then((tasks: Tasks[]) => {
            this.setState({taskData: tasks})
        })

        // Set up tags
        Tag.scan().then((tags: Tag[]) => {
            this.setState({tagData: tags})
        })

        // Set up Sprints
        Sprints.scan().then((sprints: Sprints[]) => {
            this.setState({sprintData: sprints})
        })

        // Bindings
        this.setActiveComponent = this.setActiveComponent.bind(this);
        this.setSelectedObject = this.setSelectedObject.bind(this);
        this.clearSelectedObject = this.clearSelectedObject.bind(this);
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

                <FormHolder
                    activeComponent={this.state.activeComponent}
                    selectedObject={this.state.selectedObject}
                    tagData={this.state.tagData}
                />
                <div id={"testing"}></div>

            </div>

        return html;
    }
}

export {PrimaryLayout}
export {WitComponent}
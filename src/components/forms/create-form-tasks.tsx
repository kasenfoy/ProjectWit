import {CreateFormBase, CreateFormBaseProps} from "./create-form";
import {Tag, Tasks, WitObject} from "../../lib/types";
import {ITasks} from "../../lib/interfaces/types";
import {Name} from "../basic/name";
import {Block} from "../basic/block";
import {WitComponent} from "../primary-layout";
import BasicModuleCss from "../css/basic.module.css"
import SelectSearch, {fuzzySearch, SelectedOptionValue} from 'react-select-search';
import React, {SyntheticEvent} from "react";
import {Status} from "../../lib/types/sprints";
import {SelectSearchHelper} from "../../lib/helpers/SelectSearchHelper";


// interface  {};
// interface s {};

interface CreateFormTasksProps extends CreateFormBaseProps{};
interface CreateFormTasksState extends ITasks{
};


class CreateFormTasks extends CreateFormBase
{
    state: CreateFormTasksState;

    constructor(props: CreateFormTasksProps) {
        super(props)

        this.state = {
            // description: '',
            // This is a merge of objects as defined in:
            // https://devblogs.microsoft.com/typescript/announcing-typescript-2-1-2/
            ...this.getStateDefaults(),
        }

        this.compileComponents = this.compileComponents.bind(this);
        this.addTag = this.addTag.bind(this);
        this.setSprint = this.setSprint.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }


    // TODO Extract these out, too much code, can be components?
    compileComponents(): JSX.Element[] {
        let superHTML = super.compileComponents();
        let html =[];

        // Description
        html.push(
            <label key={'label-description'}>
                <Name name={"Description"}/>
                <textarea name={"description"} value={this.state.description} onChange={this.handleChange} />
            </label>)

        // Sprint
        html.push(<Name name={"Sprint"}/>)

        // if (this.state.sprint === undefined || this.state.sprint === "") {
        //     // Do nothing
        // }
        // else {
        //     html.push(<Block id={this.state.sprint} asyncGetObjectName={this.retrieveSprintNameFromId}/>)
        // }

        // Sprint Search
        html.push(
            <SelectSearch
                options={super.convertWitObjectsToSelectSearch(this.props.sprintData)}
                search
                filterOptions={fuzzySearch}
                placeholder={"None"}
                onChange={this.setSprint}
                value={this.state.sprint}
            />
        )

        // Status
        html.push(<Name name={"Status"}/>);

        // Status Search
        html.push(
            <SelectSearch
                options={SelectSearchHelper.StatusSelectSearch}
                search
                filterOptions={fuzzySearch}
                placeholder={"None"}
                onChange={this.setStatus}
                value={this.state.status}
            />
        )


        // Tags
        html.push(
            <div>
                <Name name={"Tags"}/>
                {this.state.tags?.map((tagId: string)=>{
                    return <Block
                        id={tagId}
                        asyncGetObjectName={this.retrieveTagNameFromId}
                        handleDelete={this.removeTag}
                    />
                })}
            </div>
        )

        // Tag Search
        html.push(
            <SelectSearch
                options={super.convertWitObjectsToSelectSearch(this.props.tagData)}
                search
                filterOptions={fuzzySearch}
                placeholder={"None"}
                onChange={this.addTag}/>
        )



        let list = [superHTML, ...html]

        return list as JSX.Element[];
    }

    removeTag(tagId: string)
    {
        console.debug("removeTag() called on create form tasks.")
        if (this.state.tags?.includes(tagId))
        {
            let task = this.props.selectedObject as Tasks
            let tag = new Tag({id: tagId})
            task.removeTag(tag);
        }
    }

    addTag(value: SelectedOptionValue | SelectedOptionValue[] | undefined)
    {
        if (value === undefined)
            throw "Undefined value in addTag()"

        console.debug(value)
        if (this.state.tags?.includes(value.toString()))
        {
            return;
        }

        // TODO Fix this, state is appearing as base form state
        let arr = this.state.tags
        arr?.push(value.toString());
        // @ts-ignore
        this.setState({tags: arr})
    }

    setSprint(value: SelectedOptionValue | SelectedOptionValue[] | undefined)
    {
        if (value === undefined)
            throw "Undefined value in addSprint()"

        if (this.state.sprint === value.toString())
        {
            return;
        }

        // @ts-ignore
        this.setState({sprint: value.toString()})
    }

    setStatus(value: SelectedOptionValue | SelectedOptionValue[] | undefined)
    {
        if (value === undefined)
            throw "Undefined value in addSprint()"

        // Check if value exists in ENUM
        // @ts-ignore
        if (Object.values(Status).includes(value.toString()) === false)
        {
            let err = "Value: " + value.toString() + " is not part of Status ENUM"
            throw err
        }

        // Do nothing if already same status.
        if (this.state.status === value.toString())
        {
            return;
        }

        // @ts-ignore
        this.setState({status: value.toString()})
    }



    // Override for tasks form
    createObject(obj: ITasks) {
        Tasks.create(obj);
    }

    updateObject(obj: ITasks) {
        let task = new Tasks(obj);
        task.update()
    }

    async delete(id: string): Promise<void> {
        await Tasks.delete(id);
    }

    generateEmptyWitObject(): Tasks
    {
        return new Tasks({id: WitObject.generateId()})
    }
    // Convert tags to state,
    // Render block with just ID using state.
    // call componentDidMount to run Tag get()
    // Re-render block???? with new props.

    // Or, pass function "RetrieveNameFromWitObject" in props
    // Execute function in Block "ComponentDidMount"
    // Update state of Name? YES assign props id to state name, update function then updates state name
}

export {CreateFormTasks}

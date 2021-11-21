import {CreateFormBase, CreateFormBaseProps} from "./create-form";
import {Tag, Tasks} from "../../lib/types";
import {ITasks} from "../../lib/interfaces/types";
import {Name} from "../basic/name";
import {Block} from "../basic/block";
import {WitComponent} from "../primary-layout";
import BasicModuleCss from "../css/basic.module.css"
import SelectSearch, {fuzzySearch, SelectedOptionValue} from 'react-select-search';
import React, {SyntheticEvent} from "react";


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
    }

    async retrieveTagNameFromId(id: string)
    {
        console.debug("retrieveTagNameFromId called with id: ", id)
        let tag = await Tag.get(id);
        return tag.data.name;
    }


    // TODO Update the UL and LI elements to be a BoxElement??? (Name to come)
    // TODO Extract these out, too much code, can be components?
    compileComponents(): JSX.Element[] {
        let superHTML = super.compileComponents();
        let html =[
            <label key={'label-description'}>
                <Name name={"Description"}/>
                <textarea name={"description"} value={this.state.description} onChange={this.handleChange} />
            </label>
            ,
            <label>
                <Name name={"Sprints"}/>
                <ul>
                    {this.state.sprints?.map((sprint: string)=>{
                        return <li>{sprint}</li>
                    })}
                </ul>
            </label>
            ,
            <div>
                <Name name={"Tags"}/>
                    {this.state.tags?.map((tagId: string)=>{
                        return <Block
                            id={tagId}
                            asyncGetObjectName={this.retrieveTagNameFromId}
                        />
                    })}
            </div>
            ,
            <SelectSearch
                options={super.convertWitObjectsToSelectSearch(this.props.tagData)}
                search
                filterOptions={fuzzySearch}
                placeholder={"None"}
                onChange={this.addTag}
            />
        ]

        let list = [superHTML, ...html]

        return list as JSX.Element[];
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

    // Override for tasks form
    createObject(obj: ITasks) {
        Tasks.create(obj);
    }

    updateObject(obj: ITasks) {
        let task = new Tasks(obj);
        task.update()
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

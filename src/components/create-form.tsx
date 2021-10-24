import React, {ChangeEventHandler, FormEventHandler} from "react";
import {WitObject} from "../lib/types";
import {IWitObject} from "../lib/interfaces/types";


// Make the props a list of form item components to include (ID, Name, Description, etc)
interface CreateFormBaseProps{
    fromEntry?: IWitObject
}

interface CreateFormBaseState extends IWitObject{
    name: string
}

class CreateFormBase extends React.Component<CreateFormBaseProps,CreateFormBaseState> {

    state: CreateFormBaseState
        // id: WitObject.generateId()


    constructor(props: CreateFormBaseProps) {
        super(props);
        console.debug("CreateFormBaseProps has been called")

        // Get/Set default state. This is implemented here so subclasses
        // can retrieve the state values without them being overwritten
        this.getStateDefaults = this.getStateDefaults.bind(this);
        this.getStateDefaults(props);
        this.state = this.getStateDefaults(props);

        console.log("this.state from constructor: ", this.state)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getState = this.getState.bind(this);
        this.createObject = this.createObject.bind(this);
    }

    getStateDefaults(props: CreateFormBaseProps)
    {
        let id;

        // Check if we need to initialzie from object
        // TODO Implement update initialize.
        if (props.fromEntry === undefined)
        {
            id = WitObject.generateId()
        }
        else
        {
            id = props.fromEntry.id;
        }

        return {
            id: id,
            name: ''
        }
    }

    handleChange(event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) {
        console.debug("handleChange() has been called.")

        const target = event.target;
        const value = target.value;
        const name = target.name

        console.debug(target);
        console.debug(value);
        console.debug(name);
        // Left off here 2021-10-22 need to find a way to do this generically.
        // @ts-ignore
        this.setState({
            [name]: event.target.value})

        console.log(this.state)
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        console.log("React event")
        console.log(event);
        console.log(this.state)
        this.createObject(this.state);
    }

    compileForm(components: JSX.Element[]): JSX.Element
    {
        let html =
        <form onSubmit={this.handleSubmit}>
            {/*{components.map((c)=>{c})}*/}
            {components}

            <input type="submit" value="Submit" />
        </form>

        return html;
    }

    compileComponents(): JSX.Element[]
    {
        let html =
        <label>
            <p>Name</p>
            <input name={"name"} value={this.state.name} onChange={this.handleChange}/>
        </label>

        return [html];
    }

    getState()
    {
        console.debug("getState has been called, returning state: ", this.state)
        return this.state
    }

    createObject(obj: IWitObject){
        throw "Base class createObject() called. You must implement a createObject in the child class"
    }

    render() {
        let html =
            {/*<label>*/}
            {/*    <p>Description</p>*/}
            {/*    <textarea name={"description"} value={this.state.} onChange={this.handleChange} />*/}
            {/*</label>*/}

        let components = this.compileComponents();
        let form = this.compileForm(components);

        return form;
    }

}

export {CreateFormBase}
export type {CreateFormBaseProps, CreateFormBaseState}
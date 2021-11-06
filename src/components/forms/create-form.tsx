import React, {ChangeEventHandler, FormEventHandler} from "react";
import {Tag, WitObject} from "../../lib/types";
import {IWitObject} from "../../lib/interfaces/types";
import CreateFormCss from "../css/create-form.module.css"
import {WitComponent} from "../primary-layout";
import {Name} from "../basic/name";
import {ISelectSearch} from "../../lib/interfaces/ISelectSearch";
import SelectSearch, {fuzzySearch} from "react-select-search";
import SelectSearchCss from "../css/select-search.module.css";


// Make the props a list of form item components to include (ID, Name, Description, etc)
interface CreateFormBaseProps {
    activeComponent: WitComponent
    selectedObject?: WitObject,
    tagData?: Tag[]
}

interface CreateFormBaseState extends IWitObject{};


// class CreateFormBase extends React.Component<CreateFormBaseProps,CreateFormBaseState> {
class CreateFormBase extends React.PureComponent<CreateFormBaseProps, CreateFormBaseState> {
    state: CreateFormBaseState;

    constructor(props: CreateFormBaseProps) {
        super(props);
        console.debug("CreateFormBaseProps has been called")

        // Get/Set default state. This is implemented here so subclasses
        // can retrieve the state values without them being overwritten
        // this.getStateDefaults = this.getStateDefaults.bind(this);
        // this.getStateDefaults(props);
        // this.state = this.getStateDefaults();
        // this.setState(this.getStateDefaults())

        if (this.props.selectedObject === undefined)
        {
            this.state = {'id': WitObject.generateId()}
        }
        else
        {
            this.state = this.props.selectedObject.data
        }

        // console.log("this.state from constructor: ", this.state)
        this.handleChange   = this.handleChange.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        // this.getState       = this.getState.bind(this);
        this.createObject   = this.createObject.bind(this);

    }


    // Helper function, maps WitObject to format expected by SelectSearch library
    convertWitObjectsToSelectSearch(obj: WitObject[] | undefined): ISelectSearch[] {
        if (obj === undefined) {return []}

        let selectSearchArr: ISelectSearch[] = obj.map((item: WitObject)=>{
            if (item.data.name === undefined)
            {
                console.error(item)
                throw 'Tried to convert a WitObject with an empty name to ISelectSearch, see above for item.'
            }
            return {name: item.data.name, value: item.data.id}
        })

        return selectSearchArr

    }

    getStateDefaults(): IWitObject
    {
        let id;

        // Check if we need to initialzie from object
        // TODO Implement update initialize.
        if (this.props.selectedObject === undefined)
        {
            id = WitObject.generateId()
            return {
                id: id,
            }
        }
        else
        {
            return {
                ...this.props.selectedObject.data
            }
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
        if (this.props.selectedObject === undefined)
        {
            this.createObject(this.state);
        }
        else
        {
            this.updateObject(this.state);
        }

    }

    compileForm(components: JSX.Element[]): JSX.Element
    {
        let html =
            <div className={CreateFormCss.CreateForm}>
                <h2><p>{this.props.activeComponent}</p></h2>
                <form onSubmit={this.handleSubmit}>
                    {/*{components.map((c)=>{c})}*/}
                    {components}

                    { this.props.selectedObject === undefined && <input type="submit" value="Create" />}
                    { this.props.selectedObject !== undefined && <input type="submit" value="Update" />}
                </form>
            </div>
        return html;
    }

    compileComponents(): JSX.Element[]
    {
        // Trying to reset state to blank.
        // if (this.props.selectedObject === undefined)
        // {
        //     this.setState(undefined)
        // }

        let html = []

        if (this.props.selectedObject !== undefined)
        {
            html.push(<p><Name name={"ID"}/> {this.state.id}</p>);
        }


        if (this.state.created_utc !== undefined) {
            html.push(<p><Name name={"Created"}/> {this.state.created_utc}</p>)
        }

        if (this.state.last_updated_utc !== undefined) {
            html.push(<p><Name name={"Updated"}/> {this.state.last_updated_utc}</p>)
        }

        html.push(
            <label key={"name-label"}>
                <Name name={"Name"}/>
                <input name={"name"} value={this.state.name} onChange={this.handleChange}/>
            </label>
        );

        return [...html];
    }

    // TODO Evaluate if this is needed commented out 2021-10-31
    // getState()
    // {
    //     console.debug("getState has been called, returning state: ", this.state)
    //     return this.state
    // }

    createObject(obj: IWitObject){
        throw "Base class createObject() called. You must implement a createObject in the child class"
    }

    updateObject(obj: IWitObject){
        throw "Base class updateObject() called. You must implement a updateObject in the child class"
    }

    componentDidMount() {
        console.debug("Create-form component did mount")
    }

    componentDidUpdate(prevProps: Readonly<CreateFormBaseProps>, prevState: Readonly<CreateFormBaseState>, snapshot?: any) {
        if(prevProps.selectedObject !== this.props.selectedObject)
        {
            this.setState(this.getStateDefaults());
        }
    }

    render() {

        let components = this.compileComponents();
        let form = this.compileForm(components);

        return form;
    }

}

export {CreateFormBase}
export type {CreateFormBaseProps, CreateFormBaseState}
import React from "react";
import {CreateFormTasks} from "./create-form-tasks";
import {CreateFormTags} from "./create-form-tags";
import {WitComponent} from "../primary-layout";
import FormHolderCss from "../css/form-holder.module.css"
import {Tag, WitObject} from "../../lib/types";
import {CreateFormSprints} from "./create-form-sprints";


interface FormHolderProps {
    selectedObject?: WitObject,
    activeComponent: WitComponent,
    tagData?: Tag[]
}



class FormHolder extends React.Component<FormHolderProps, {}>
{
    constructor(props: FormHolderProps) {
        super(props);
    }


    render() {
        // TODO Implement ClassName for formHolder div (Low priority)
        let html =
            <div id={"form-holder"} className={FormHolderCss.FormHolder}>
                {
                    this.props.activeComponent === WitComponent.TASKS
                    && <CreateFormTasks activeComponent={this.props.activeComponent} selectedObject={this.props.selectedObject} tagData={this.props.tagData} />}
                {
                    this.props.activeComponent === WitComponent.TAGS
                    && <CreateFormTags activeComponent={this.props.activeComponent} selectedObject={this.props.selectedObject} />
                }
                {
                    this.props.activeComponent === WitComponent.SPRINTS
                    && <CreateFormSprints activeComponent={this.props.activeComponent} selectedObject={this.props.selectedObject} tagData={this.props.tagData}/>
                }
            </div>
        return html
    }

}

export { FormHolder }
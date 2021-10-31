import React from "react";
import {CreateFormTasks} from "./create-form-tasks";
import {CreateFormTags} from "./create-form-tags";

// TODO fix the 'any' parameter types.
class FormHolder extends React.Component<any, any>
{
    constructor(props: any) {
        super(props);
    }


    render() {
        // TODO Implement ClassName for formHolder div (Low priority)
        let html =
            <div>
                <CreateFormTasks />
                <CreateFormTags />
            </div>
        return html
    }

}

export { FormHolder }
import React from "react";
import {DescribeComponent} from "../describe-component";
import BasicModuleCss from "../css/basic.module.css"

// Make the props a list of form item components to include (ID, Name, Description, etc)
interface NameProps {
    name: string | undefined
}

interface NameState {}

class Name extends React.Component<NameProps,NameState> {


    constructor(props: NameProps) {
        super(props);
    }

    render() {
        let html =
            <div className={BasicModuleCss.Name}>
                <b>{this.props.name}</b>
            </div>
        return html;
    }

}

export {Name}
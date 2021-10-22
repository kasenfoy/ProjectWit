import React from "react";
import {DescribeComponent} from "../describe-component";

// Make the props a list of form item components to include (ID, Name, Description, etc)
interface NameProps {
    name: string | undefined
}

interface NameState {
    isShown: boolean
    // setIsShown: boolean
}

class Name extends React.Component<NameProps,NameState> {
    name: string | undefined;
    state: NameState = {
        isShown: false
    }


    constructor(props: NameProps) {
        super(props);
        this.name = props.name
    }

    render() {
        let html =
            <div>
                <b>{this.name}</b>
            </div>
        return html;

    }

}

export {Name}
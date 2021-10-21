import React from "react";

// Make the props a list of form item components to include (ID, Name, Description, etc)
interface IdProps {
    message: string
}

interface IdState {

}

class Id extends React.Component<IdProps,IdState> {

    message: string;

    constructor(props: IdProps) {
        super(props);
        this.message = props.message
    }

    render() {
        let html =
            <div><p>{this.message}</p></div>
            // TODO Left off here, thought process is that this should create a pop-up on hover to describe a component.
        return html;

    }

}

export {Id}
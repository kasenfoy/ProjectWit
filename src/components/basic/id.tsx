import React from "react";

// Make the props a list of form item components to include (ID, Name, Description, etc)
interface IdProps {
    id: string
}

interface IdState {

}

class Id extends React.Component<IdProps,IdState> {

    id: string;

    constructor(props: IdProps) {
        super(props);
        this.id = props.id
    }

    render() {
        let html =
            <div><b>{this.id}</b></div>
        return html;

    }

}

export {Id}
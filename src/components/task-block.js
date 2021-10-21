import React from "react";

// TODO This is too specific, needs to be abstracted to smaller components (ID, Name, Description)
class TaskBlock extends React.Component {

    render() {
        console.log("Rendering Task Block with props", this.props);
        return (
            <div className="TaskBlock">
                <div>ID: {this.props.data.id}</div>
                <div>Name: {this.props.data.name}</div>
                <div>Description: {this.props.data.description}</div>
            </div>
        )
    }
}

export { TaskBlock }
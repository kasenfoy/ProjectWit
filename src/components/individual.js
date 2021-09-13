import React from "react";

class Individual extends React.Component {
    render() {
        return <h1>Hello is it me you're looking for: , {this.props.name}</h1>;
    }
}

export { Individual }
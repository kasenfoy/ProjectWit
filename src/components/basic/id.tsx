import React from "react";
import {DescribeComponent} from "../describe-component";

// Make the props a list of form item components to include (ID, Name, Description, etc)
interface IdProps {
    id: string
}

interface IdState {
    isShown: boolean
    // setIsShown: boolean
}

class Id extends React.Component<IdProps,IdState> {
    id: string;
    state: IdState = {
        isShown: false
    }


    constructor(props: IdProps) {
        super(props);
        this.id = props.id
    }

    render() {
        let html =
            <div
                onMouseEnter={()=>this.setState({isShown: true})}
                onMouseLeave={()=>this.setState({isShown: false})}>
                {/*{this.state.isShown && (*/}
                {/*    <DescribeComponent message={"The id"}/>*/}
                {/*)}*/}
                <b>{this.id}</b>
            </div>
        return html;

    }

}

export {Id}
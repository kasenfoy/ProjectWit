import React from "react";
import DescribeComponentCss from './css/describe-component.module.css'
// Make the props a list of form item components to include (ID, Name, Description, etc)
interface DescribeComponentProps {
    message: string
}

interface DescribeComponentState {

}

class DescribeComponent extends React.Component<DescribeComponentProps,DescribeComponentState> {

    message: string;

    constructor(props: DescribeComponentProps) {
        super(props);
        this.message = props.message
    }

    render() {
        let html =
            <div className={DescribeComponentCss.DescribeComponentDiv}><p>{this.message}</p></div>
            // TODO Left off here, thought process is that this should create a pop-up on hover to describe a component.
        return html;

    }

}

export {DescribeComponent}
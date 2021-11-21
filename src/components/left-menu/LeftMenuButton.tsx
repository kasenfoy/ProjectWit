import React from "react";
import {WitComponent} from "../primary-layout";
import LeftMenuCss from "../css/left-menu.module.css"

interface LeftMenuButtonProps {
    // Declares for a function that a parent element must pass in.
    activateComponent: WitComponent;
    handleChange: (component: WitComponent) => void;
};
interface LeftMenuButtonState {};

class LeftMenuButton extends React.Component<LeftMenuButtonProps, LeftMenuButtonState>
{

    constructor(props: LeftMenuButtonProps) {
        super(props);
        this.changeActiveComponent = this.changeActiveComponent.bind(this);
    }

    // This passes the WitComponent back up to the parent
    // WitComponent above is abstract so values must be typed by subclasses
    changeActiveComponent()
    {
        this.props.handleChange(this.props.activateComponent)
    }

    render() {
        let html =
            <div onClick={this.changeActiveComponent} className={LeftMenuCss.LeftMenuButton}>
                {this.props.activateComponent}
            </div>
        return html;
    }
}

export {LeftMenuButton}
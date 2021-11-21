import React from "react";
import {WitComponent} from "./primary-layout";
import {LeftMenuButton} from "./left-menu/LeftMenuButton";
import LeftMenuCss from "../components/css/left-menu.module.css"

// import LeftMenuCss from "./css"

interface LeftMenuState {

}

interface LeftMenuProps {
    handleActiveComponentChange: (component: WitComponent) => void;
}

class LeftMenu extends React.Component<LeftMenuProps, LeftMenuState> {

    state: LeftMenuState;

    constructor(props: LeftMenuProps) {
        super(props);
        this.state = {};
    }


    // TODO ICONS (TASK, TAGS, SPRINTS, USERS)
    render() {
        let html =
            <div className={LeftMenuCss.LeftMenu}>
                <div><h3><p>WIT</p></h3></div>
                <LeftMenuButton activateComponent={WitComponent.TASKS} handleChange={this.props.handleActiveComponentChange}/>
                <LeftMenuButton activateComponent={WitComponent.TAGS} handleChange={this.props.handleActiveComponentChange}/>
                <LeftMenuButton activateComponent={WitComponent.SPRINTS} handleChange={this.props.handleActiveComponentChange}/>
                {/*<LeftMenuButton activateComponent={WitComponent.USERS} handleChange={this.props.handleActiveComponentChange}/>*/}
            </div>

        return html;
    }

}

export {LeftMenu}
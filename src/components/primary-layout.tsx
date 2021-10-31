import React from "react";
import {FormHolder} from "./forms/form-holder";

class PrimaryLayout extends React.Component
{
    constructor(props: {}) {
        super(props);
    }

    render() {
        let html =
            <div id={"all-content"}>
                <div id={"lists"}></div>
                {/*<div id={"forms"}></div>*/}
                <FormHolder />
                <div id={"testing"}></div>
            </div>

        return html;
    }
}

export {PrimaryLayout}
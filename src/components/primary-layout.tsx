import React from "react";

class PrimaryLayout extends React.Component
{
    constructor(props: {}) {
        super({});
    }

    render() {
        let html =
            <div id={"all-content"}>
                <div id={"lists"}></div>
                <div id={"forms"}></div>
                <div id={"testing"}></div>
            </div>

        return html;
    }
}

export {PrimaryLayout}